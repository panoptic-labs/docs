import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { load } from "cheerio";

const site = "https://panoptic.xyz";
const organizationId = `${site}/#organization`;
const websiteId = `${site}/#website`;
const founderId = `${site}/about#guillaume-lambert`;
const definition =
  "Panoptic is a perpetual options protocol built on Uniswap that enables oracle-free options trading on any token";

async function readPage(route) {
  const html = await readFile(
    new URL(
      `../build${route === "/" ? "" : route}/index.html`,
      import.meta.url,
    ),
    "utf8",
  );
  const $ = load(html);
  const schemas = $('script[type="application/ld+json"]')
    .toArray()
    .map((script) => JSON.parse($(script).text()));
  assert.ok(schemas.length, `Missing JSON-LD: ${route}`);
  for (const schema of schemas) {
    assert.equal(schema["@context"], "https://schema.org");
  }
  const nodes = schemas.flatMap((schema) => schema["@graph"] ?? [schema]);
  const ids = nodes.map((node) => node["@id"]);
  assert.equal(new Set(ids).size, ids.length, `Duplicate entity IDs: ${route}`);
  assert.equal($('link[rel="canonical"]').length, 1, route);
  assert.equal($('link[rel="canonical"]').attr("href"), `${site}${route}`);
  const organization = nodes.find((node) => node["@id"] === organizationId);
  const website = nodes.find((node) => node["@id"] === websiteId);
  assert.equal(organization?.["@type"], "Organization");
  assert.deepEqual(organization.founder, { "@id": founderId });
  assert.equal(website?.["@type"], "WebSite");
  assert.deepEqual(website.publisher, { "@id": organizationId });
  assert.ok(
    $('footer a[href="/about"]').length,
    `Missing About link: ${route}`,
  );
  return { $, schemas, nodes };
}

const homepage = await readPage("/");
assert.ok(homepage.$("main").text().includes(definition));
assert.match(homepage.$("title").text(), /Perpetual Options.*Uniswap/);
assert.equal(
  homepage.$('meta[name="description"]').attr("content"),
  definition,
);

const about = await readPage("/about");
const person = about.nodes.find((node) => node["@id"] === founderId);
assert.equal(person?.["@type"], "Person");
assert.equal(person.name, "Guillaume Lambert");
assert.equal(person.jobTitle, "Founder");
assert.equal(person.url, `${site}/about`);
assert.equal(person.image, `${site}/img/Guillaume.jpg`);
assert.deepEqual(person.worksFor, { "@id": organizationId });
assert.ok(about.$("#guillaume-lambert").text().includes(person.name));
for (const url of person.sameAs) {
  assert.ok(
    about
      .$("a")
      .toArray()
      .some((anchor) => about.$(anchor).attr("href") === url),
    `Missing visible profile: ${url}`,
  );
}
await readFile(new URL("../build/img/Guillaume.jpg", import.meta.url));
await readFile(new URL("../build/img/logo.svg", import.meta.url));

let checked = 0;
let founderPosts = 0;
const exampleRoute = "/research/uniswap-violates-geometric-brownian-motion";
let example;
for (const instance of ["default", "research"]) {
  const checkedBeforeInstance = checked;
  const directory = new URL(
    `../.docusaurus/docusaurus-plugin-content-blog/${instance}/`,
    import.meta.url,
  );
  for (const file of await readdir(directory)) {
    if (!file.endsWith(".json")) continue;
    const metadata = JSON.parse(
      await readFile(new URL(file, directory), "utf8"),
    );
    if (!metadata.source || !metadata.permalink || !metadata.authors) continue;
    const page = await readPage(metadata.permalink);
    const article = page.nodes.find((node) => node["@type"] === "BlogPosting");
    assert.ok(article, `Missing article: ${metadata.permalink}`);
    assert.equal(article["@id"], `${site}${metadata.permalink}#article`);
    assert.equal(article.headline, metadata.title);
    assert.equal(article.datePublished, metadata.date);
    const update = metadata.frontMatter.editorial_update;
    assert.equal(article.dateModified, update);
    assert.equal(
      page.$('meta[property="article:modified_time"]').attr("content"),
      update,
    );
    assert.equal(
      page.$('article time[itemprop="dateModified"]').attr("datetime"),
      update,
    );
    assert.deepEqual(article.publisher, { "@id": organizationId });
    assert.deepEqual(article.isPartOf, { "@id": websiteId });
    const authors = metadata.authors.filter((author) => author.name);
    assert.equal(article.author?.length ?? 0, authors.length);
    for (const [index, author] of authors.entries()) {
      if (author.key === "G") {
        assert.deepEqual(article.author[index], { "@id": founderId });
        assert.deepEqual(
          page.nodes.find((node) => node["@id"] === founderId),
          Object.fromEntries(
            Object.entries(person).filter(([key]) => key !== "@context"),
          ),
        );
        assert.ok(
          page
            .$(`article a[href="${person.url}"]`)
            .text()
            .includes(person.name),
          `Missing founder byline: ${metadata.permalink}`,
        );
        founderPosts++;
      } else {
        assert.equal(article.author[index].name, author.name);
        assert.notEqual(article.author[index]["@id"], founderId);
      }
    }
    if (!authors.length) assert.equal(article.author, undefined);
    if (metadata.permalink === exampleRoute) example = page.schemas;
    checked++;
  }
  assert.ok(
    checked > checkedBeforeInstance,
    `Expected authored articles in ${instance}`,
  );
}
assert.ok(founderPosts > 0, "Expected founder-authored articles");
assert.ok(example);
if (process.argv.includes("--print")) {
  console.log(
    JSON.stringify(
      {
        "/": homepage.schemas,
        "/about": about.schemas,
        [exampleRoute]: example,
      },
      null,
      2,
    ),
  );
}
console.error(
  `Verified homepage, About, and ${checked} articles; ${founderPosts} founder bylines; JSON-LD, author references, canonicals, and local identity assets.`,
);
