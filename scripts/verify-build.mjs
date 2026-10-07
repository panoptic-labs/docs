import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { load } from "cheerio";

const home = load(
  await readFile(new URL("../build/index.html", import.meta.url), "utf8"),
);
const headline = home(".hero-content h1");
assert.ok(headline.text().trim(), "Homepage headline must be server-rendered");
for (const element of headline.parents().addBack().toArray()) {
  assert.doesNotMatch(
    home(element).attr("style") ?? "",
    /(?:^|;)\s*(?:opacity\s*:\s*0(?:\.0+)?|display\s*:\s*none|visibility\s*:\s*hidden)\s*(?:;|$)/i,
    "Homepage headline must be visible before JavaScript loads",
  );
}
const updateImages = home(".recent-updates img");
assert.ok(updateImages.length, "Missing recent update images");
for (const image of updateImages.toArray()) {
  assert.equal(
    home(image).attr("loading"),
    "lazy",
    "Below-the-fold update images must not compete with the hero",
  );
  const src = home(image).attr("src");
  if (src?.startsWith("/img/generated/recent-updates/")) {
    assert.ok(home(image).attr("srcset"), "Missing responsive image variants");
    assert.ok(home(image).attr("width"), "Missing thumbnail width");
    assert.ok(home(image).attr("height"), "Missing thumbnail height");
    const thumbnail = await readFile(
      new URL(`../build${src}`, import.meta.url),
    );
    assert.ok(
      thumbnail.length < 50_000,
      "Default thumbnail must stay lightweight",
    );
  }
}

for (const link of home('link[rel="stylesheet"]').toArray()) {
  const href = home(link).attr("href");
  if (!href?.startsWith("/assets/css/")) continue;
  const css = await readFile(
    new URL(`../build${href}`, import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(
    css,
    /@font-face\s*\{[^}]*data:/,
    "Font files must not be embedded in render-blocking CSS",
  );
}

const intro = load(
  await readFile(
    new URL("../build/docs/intro/index.html", import.meta.url),
    "utf8",
  ),
);
const video = intro("video");
assert.equal(video.attr("preload"), "none");
assert.equal(video.attr("poster"), "/img/panoptic-intro-poster.webp");
assert.equal(video.attr("width"), "1920");
assert.equal(video.attr("height"), "1080");
const poster = await readFile(
  new URL("../build/img/panoptic-intro-poster.webp", import.meta.url),
);
assert.ok(poster.length < 20_000, "Intro poster must stay lightweight");

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
