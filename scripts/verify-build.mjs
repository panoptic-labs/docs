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
  const html = await readFile(
    new URL(`../build${url.pathname}/index.html`, import.meta.url),
    "utf8",
  );
  assert.ok(html.includes("<article"), `Missing article for ${url.pathname}`);
  if (url.hash)
    assert.ok(
      html.includes(`id="${url.hash.slice(1)}"`),
      `Missing fragment ${url}`,
    );
  checked++;
}
console.log(
  `Verified llms.txt and ${checked} built documentation destinations.`,
);
