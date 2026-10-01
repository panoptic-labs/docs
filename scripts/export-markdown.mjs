import { readFile, readdir, writeFile } from "node:fs/promises";
import { articleMarkdown } from "./markdown.mjs";

const build = new URL("../build/", import.meta.url);
const pages = [];
async function collect(directory) {
  for (const entry of await readdir(new URL(directory, build), {
    withFileTypes: true,
  })) {
    const path = `${directory}${entry.name}`;
    if (entry.isDirectory()) await collect(`${path}/`);
    else if (entry.name.endsWith(".html")) {
      const html = await readFile(new URL(path, build), "utf8");
      if (!html.includes('class="theme-doc-markdown markdown"')) continue;
      const route = `/${path.replace(/\/index\.html$|\.html$/g, "")}`;
      pages.push({ route, html });
    }
  }
}
await collect("docs/");
if (!pages.length) throw new Error("No built documentation articles to export");
const routes = new Set(pages.flatMap(({ route }) => [route, `${route}/`]));
for (const { route, html } of pages) {
  await writeFile(
    new URL(`.${route}.md`, build),
    articleMarkdown(html, `https://panoptic.xyz${route}`, routes),
  );
}
console.log(`Exported ${pages.length} Markdown documentation pages.`);
