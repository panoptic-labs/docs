import { readFile, writeFile } from "node:fs/promises";
import { renderTables } from "./risk-engines.mjs";

const snapshot = JSON.parse(
  await readFile(
    new URL("../static/data/risk-engines.json", import.meta.url),
    "utf8",
  ),
);
const path = new URL("../docs/contracts/parameters.md", import.meta.url);
const content = await readFile(path, "utf8");
const start = "<!-- BEGIN GENERATED RISK ENGINE TABLES -->";
const end = "<!-- END GENERATED RISK ENGINE TABLES -->";
if (!content.includes(start) || !content.includes(end))
  throw new Error("Missing parameter table markers");
const generated = `${content.split(start)[0]}${start}\n\n${renderTables(snapshot)}\n\n${end}${content.split(end)[1]}`;
if (process.argv.includes("--check")) {
  if (generated !== content)
    throw new Error(
      "Parameter tables are stale. Run pnpm generate:risk-tables.",
    );
} else await writeFile(path, generated);
