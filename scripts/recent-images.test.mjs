import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";
import { optimizeRecentImages } from "./recent-images.mjs";

async function fixture(t, width = 1200) {
  const directory = await mkdtemp(path.join(os.tmpdir(), "recent-images-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await mkdir(path.join(directory, "img"));
  await sharp({
    create: {
      width,
      height: width / 2,
      channels: 3,
      background: "#590ff5",
    },
  })
    .png()
    .toFile(path.join(directory, "img/banner.png"));
  return directory;
}

test("generates responsive WebP images with their actual dimensions", async (t) => {
  const directory = await fixture(t);
  const post = { title: "An update", image: "/img/banner.png" };
  const [result] = await optimizeRecentImages([post], directory);
  assert.equal(result.title, post.title);
  assert.equal(result.imageWidth, 320);
  assert.equal(result.imageHeight, 160);
  const variants = result.imageSrcSet.split(", ");
  assert.equal(variants.length, 3);
  for (const variant of variants) {
    const [url, descriptor] = variant.split(" ");
    const metadata = await sharp(path.join(directory, url)).metadata();
    assert.equal(metadata.format, "webp");
    assert.equal(`${metadata.width}w`, descriptor);
    assert.equal(metadata.width / metadata.height, 2);
  }
  const repeated = await optimizeRecentImages([post], directory);
  assert.deepEqual(repeated, [result]);
  assert.ok((await readFile(path.join(directory, result.image))).length > 0);
});

test("does not upscale small images or repeat srcset widths", async (t) => {
  const directory = await fixture(t, 200);
  const [result] = await optimizeRecentImages(
    [{ image: "/img/banner.png" }],
    directory,
  );
  assert.equal(result.imageWidth, 200);
  assert.equal(result.imageHeight, 100);
  assert.equal(result.imageSrcSet, `${result.image} 200w`);
});

test("changes the asset URL when an image is replaced at the same path", async (t) => {
  const directory = await fixture(t);
  const posts = [{ image: "/img/banner.png" }];
  const [before] = await optimizeRecentImages(posts, directory);
  await sharp({
    create: { width: 1200, height: 600, channels: 3, background: "#ffffff" },
  })
    .png()
    .toFile(path.join(directory, "img/banner.png"));
  const [after] = await optimizeRecentImages(posts, directory);
  assert.notEqual(after.image, before.image);
});

test("preserves external and vector images without fetching them", async (t) => {
  const directory = await fixture(t);
  const posts = [
    { image: "https://example.com/banner.png" },
    { image: "//example.com/banner.png" },
    { image: "/img/banner.svg" },
    { title: "No image" },
  ];
  assert.deepEqual(await optimizeRecentImages(posts, directory), posts);
});

test("rejects missing images and paths outside static assets", async (t) => {
  const directory = await fixture(t);
  await assert.rejects(
    optimizeRecentImages([{ image: "/../banner.png" }], directory),
    /outside the static directory/,
  );
  await assert.rejects(
    optimizeRecentImages([{ image: "/img/missing.png" }], directory),
    /ENOENT/,
  );
});
