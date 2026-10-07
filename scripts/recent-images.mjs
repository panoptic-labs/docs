import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export async function optimizeRecentImages(posts, staticDirectory) {
  const outputDirectory = path.join(
    staticDirectory,
    "img/generated/recent-updates",
  );
  await mkdir(outputDirectory, { recursive: true });
  const images = new Map();

  for (const post of posts) {
    if (
      typeof post.image !== "string" ||
      !/^\/(?!\/).+\.(png|jpe?g|webp)$/i.test(post.image) ||
      images.has(post.image)
    ) {
      continue;
    }
    const sourcePath = path.resolve(staticDirectory, `.${post.image}`);
    if (path.relative(staticDirectory, sourcePath).startsWith("..")) {
      throw new Error(
        `Update image is outside the static directory: ${post.image}`,
      );
    }
    const source = await readFile(sourcePath);
    const hash = createHash("sha256")
      .update(source)
      .update("webp-80-320-640-960-v1")
      .digest("hex")
      .slice(0, 16);
    const variants = [];
    for (const width of [320, 640, 960]) {
      const { data, info } = await sharp(source)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer({ resolveWithObject: true });
      if (variants.some((variant) => variant.width === info.width)) continue;
      const filename = `${hash}-${info.width}.webp`;
      await writeFile(path.join(outputDirectory, filename), data);
      variants.push({
        url: `/img/generated/recent-updates/${filename}`,
        width: info.width,
        height: info.height,
      });
    }
    const [smallest] = variants;
    images.set(post.image, {
      image: smallest.url,
      imageSrcSet: variants
        .map(({ url, width }) => `${url} ${width}w`)
        .join(", "),
      imageWidth: smallest.width,
      imageHeight: smallest.height,
    });
  }

  return posts.map((post) => ({ ...post, ...images.get(post.image) }));
}
