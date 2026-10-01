import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(
  new URL("../static/llms.txt", import.meta.url),
  "utf8",
);
const built = await readFile(
  new URL("../build/llms.txt", import.meta.url),
  "utf8",
);
assert.equal(source, built, "Built llms.txt differs from source");
let checked = 0;
for (const match of source.matchAll(/\[[^\]]+\]\((https:\/\/[^)]+)\)/g)) {
  const url = new URL(match[1]);
  if (url.origin !== "https://panoptic.xyz") continue;
  assert.ok(url.pathname.endsWith(".md"), `Expected Markdown URL: ${url}`);
  const markdown = await readFile(
    new URL(`../build${url.pathname}`, import.meta.url),
    "utf8",
  );
  assert.match(markdown, /^# /m, `Missing Markdown title: ${url}`);
  const route = url.pathname.slice(0, -3);
  const html = await readFile(
    new URL(`../build${route}/index.html`, import.meta.url),
    "utf8",
  );
  assert.ok(html.includes("<article"), `Missing article for ${url.pathname}`);
  if (url.hash) {
    assert.ok(
      html.includes(`id="${url.hash.slice(1)}"`),
      `Missing fragment ${url}`,
    );
    assert.ok(
      markdown.includes(`<a id="${url.hash.slice(1)}"></a>`),
      `Missing Markdown fragment ${url}`,
    );
  }
  checked++;
}
console.log(
  `Verified llms.txt and ${checked} built documentation destinations.`,
);
