import assert from "node:assert/strict";
import test from "node:test";
import { articleMarkdown } from "./markdown.mjs";

const page = "https://panoptic.xyz/docs/guide";
const routes = new Set(["/docs/guide", "/docs/contracts/contract.Pool"]);
const render = (body) =>
  articleMarkdown(
    `<nav>Site menu</nav><article><nav>Breadcrumb</nav><div class="theme-doc-markdown markdown">${body}</div><footer>Edit this page</footer></article>`,
    page,
    routes,
  );

test("exports article content, heading anchors, tables and resolved links", () => {
  const markdown =
    render(`<h1>Guide</h1><h2 id="fees">Fees<a class="hash-link" href="#fees">#</a></h2>
    <p>Rendered component content</p>
    <table><thead><tr><th>Fee</th><th>Value</th></tr></thead><tbody><tr><td>Rate</td><td>10</td></tr></tbody></table>
    <a href="/docs/contracts/contract.Pool#deposit">Deposit</a>
    <a href="#fees">Fees</a><a href="https://example.com/docs">External</a>
    <img src="/assets/example.png" alt="Example"><video src="/assets/demo.mp4"></video>
    <button>Copy</button><script>danger()</script>`);
  assert.match(markdown, /^# Guide/);
  assert.match(markdown, /<a id="fees"><\/a>\n\n## Fees/);
  assert.match(markdown, /\| Fee \| Value \|/);
  assert.match(markdown, /\| Rate \| 10 \|/);
  assert.ok(
    markdown.includes(
      "https://panoptic.xyz/docs/contracts/contract.Pool.md#deposit",
    ),
  );
  assert.ok(markdown.includes("https://panoptic.xyz/docs/guide.md#fees"));
  assert.ok(markdown.includes("https://example.com/docs"));
  assert.ok(markdown.includes("https://panoptic.xyz/assets/example.png"));
  assert.ok(markdown.includes("[Video](https://panoptic.xyz/assets/demo.mp4)"));
  assert.match(markdown, /Rendered component content/);
  assert.doesNotMatch(
    markdown,
    /Site menu|Breadcrumb|Edit this page|Copy|danger/,
  );
});

test("preserves syntax-highlighted code including newlines and angle brackets", () => {
  const markdown = render(
    `<h1>Code</h1><pre class="prism-code language-js"><code><span class="token-line">import {read} from 'sdk';<br></span><span class="token-line">if (a &lt; b) {<br></span><span class="token-line">  read();<br></span><span class="token-line">}</span></code></pre>`,
  );
  assert.ok(
    markdown.includes(
      "```js\nimport {read} from 'sdk';\nif (a < b) {\n  read();\n}\n```",
    ),
  );
});

test("exports KaTeX once as inline or display LaTeX", () => {
  const math =
    '<span class="katex"><math><annotation encoding="application/x-tex">x^2</annotation></math><span>duplicated visual math</span></span>';
  const markdown = render(
    `<h1>Math</h1><p>Inline ${math}.</p><span class="katex-display">${math}</span>`,
  );
  assert.match(markdown, /Inline \$x\^2\$\./);
  assert.match(markdown, /\$\$\nx\^2\n\$\$/);
  assert.doesNotMatch(markdown, /duplicated|katex|annotation/);
});

test("rejects a redirect or missing documentation body", () => {
  assert.throws(
    () => articleMarkdown("<html>Redirect</html>", page, routes),
    /Missing documentation article/,
  );
});
