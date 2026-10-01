import { load } from "cheerio";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

export function articleMarkdown(html, pageUrl, markdownRoutes) {
  const $ = load(html);
  const article = $("article .theme-doc-markdown").first();
  if (!article.length)
    throw new Error(`Missing documentation article: ${pageUrl}`);
  article
    .find("script, style, button, .hash-link, .theme-doc-toc-mobile")
    .remove();

  article.find(".katex-display, .katex").each((_, element) => {
    const node = $(element);
    const latex = node.find('annotation[encoding="application/x-tex"]').text();
    if (!latex) return;
    const replacement = $("<span>").attr("data-latex", latex).text(latex);
    if (node.hasClass("katex-display"))
      replacement.attr("data-display", "true");
    node.replaceWith(replacement);
  });
  article.find("pre").each((_, element) => {
    const pre = $(element);
    const language = pre.attr("class")?.match(/language-([\w-]+)/)?.[1] ?? "";
    pre.find("br").replaceWith("\n");
    const code = pre.find("code");
    code.attr("class", `language-${language}`).text(code.text());
  });
  article
    .find("a[href], img[src], video[src], source[src]")
    .each((_, element) => {
      const node = $(element);
      const attribute = element.name === "a" ? "href" : "src";
      const value = node.attr(attribute);
      if (!value) return;
      const url = new URL(value, pageUrl);
      if (
        url.origin === new URL(pageUrl).origin &&
        markdownRoutes.has(url.pathname)
      ) {
        url.pathname = `${url.pathname.replace(/\/$/, "")}.md`;
      }
      node.attr(attribute, url.href);
    });

  const converter = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });
  converter.use(gfm);
  converter.addRule("headingAnchors", {
    filter: (node) => /^H[1-6]$/.test(node.nodeName),
    replacement: (content, node) => {
      const anchor = node.id ? `<a id="${node.id}"></a>\n\n` : "";
      return `\n\n${anchor}${"#".repeat(Number(node.nodeName[1]))} ${content.trim()}\n\n`;
    },
  });
  converter.addRule("math", {
    filter: (node) => node.hasAttribute("data-latex"),
    replacement: (_, node) => {
      const latex = node.getAttribute("data-latex");
      return node.hasAttribute("data-display")
        ? `\n\n$$\n${latex}\n$$\n\n`
        : `$${latex}$`;
    },
  });
  converter.addRule("media", {
    filter: ["video", "source"],
    replacement: (content, node) => {
      const src = node.getAttribute("src");
      return src ? `\n\n[Video](${src})\n\n` : content;
    },
  });
  return `${converter.turndown(article.html()).trim()}\n`;
}
