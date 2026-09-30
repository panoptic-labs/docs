import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { sourceCommit, sourceRepository } from "./risk-engines.mjs";

const sourceRoot = process.argv[2];
if (!sourceRoot)
  throw new Error(`Provide a public core checkout at ${sourceCommit}`);
const revision = execFileSync("git", ["rev-parse", "HEAD"], {
  cwd: sourceRoot,
  encoding: "utf8",
}).trim();
if (revision !== sourceCommit)
  throw new Error(`Public core must be checked out at ${sourceCommit}`);
const changes = execFileSync(
  "git",
  ["status", "--porcelain", "--untracked-files=all", "--", "contracts"],
  { cwd: sourceRoot, encoding: "utf8" },
).trim();
if (changes) throw new Error("Public contract source has local changes");
const output = await mkdtemp(path.join(tmpdir(), "panoptic-contract-docs-"));
execFileSync(
  "forge",
  ["doc", "--root", path.resolve(sourceRoot), "--out", output],
  { stdio: "inherit", env: { ...process.env, FOUNDRY_PROFILE: "prod" } },
);
const generatedRoot = path.join(output, "src/contracts");
const docsRoot = fileURLToPath(
  new URL("../docs/contracts/V2/", import.meta.url),
);
const files = (await readdir(generatedRoot, { recursive: true })).filter(
  (file) => file.endsWith(".md") && !file.endsWith("README.md"),
);
const aliases = {
  "contract.PanopticPoolV2.md": "contract.PanopticPool.md",
  "contract.CollateralTrackerV2.md": "contract.CollateralTracker.md",
  "contract.PanopticFactoryV3.md": "contract.PanopticFactory.md",
  "contract.SemiFungiblePositionManagerV3.md":
    "contract.SemiFungiblePositionManager.md",
};
const descriptionCorrections = {
  "contract.PanopticGuardian.md": [
    [
      "the PanopticGuardian and updating all RiskEngine pointers. Both `GUARDIAN_ADMIN` and `TREASURER`",
      "the PanopticGuardian. Existing RiskEngine instances cannot change their immutable `GUARDIAN` pointer;\noperators must replace the affected engines and migrate their pools and positions/state to the replacements.\nBoth `GUARDIAN_ADMIN` and `TREASURER`",
    ],
  ],
  "contract.PanopticPool.md": [
    [
      "Reverts if the current block number is below `blockNumber`.",
      "Reverts if the current block number is below `minBlockNumber` or above `maxBlockNumber`.",
    ],
    [
      "Reverts if the current block timestamp is before `deadline`.",
      "Reverts if the current block timestamp is below `minTimestamp` or above `maxTimestamp`.",
    ],
  ],
  "interfaces/interface.IRiskEngine.md": [
    [
      "Basal cost (in bps of notional) to force exercise an out-of-range position.",
      "Basal exercise-cost coefficient applied when at least one long leg is in range; fully out-of-the-money positions use `ONE_BPS` instead. Scaled by `10_000_000`.",
    ],
  ],
  "interfaces/interface.ISemiFungiblePositionManager.md": [
    [
      "The Uniswap V4 pool key in which to burn `tokenId`",
      "The ABI-encoded pool key in which to burn `tokenId` (V3: Uniswap V3 pool address, V4: Uniswap V4 `PoolKey`)",
    ],
    [
      "the poolKey of the UniswapV4 pool",
      "The ABI-encoded pool key (V3: Uniswap V3 pool address, V4: Uniswap V4 `PoolKey`)",
    ],
    ["type(int24).max = 8388608", "type(int24).max = 8388607"],
  ],
};
const destinations = new Map(
  files.map((file) => {
    const parts = file.split(path.sep);
    const filename = parts.pop();
    const source = parts.pop();
    const folder = [
      "Builder.sol",
      "RiskEngine.sol",
      "RiskEngineXStocks.sol",
    ].includes(source)
      ? "RiskEngine"
      : parts.join("/");
    return [
      file,
      [folder, aliases[filename] ?? filename].filter(Boolean).join("/"),
    ];
  }),
);
for (const file of files) {
  const destination = destinations.get(file);
  const target = path.join(docsRoot, destination);
  const sourceFile = file.slice(0, file.lastIndexOf("/"));
  let body = await readFile(path.join(generatedRoot, file), "utf8");
  for (const [original, corrected] of descriptionCorrections[destination] ??
    []) {
    assert.ok(
      body.includes(original),
      `Source description changed in ${destination}`,
    );
    body = body.replaceAll(original, corrected);
  }
  body = body.replace(
    /\[Git Source\]\([^\n]+\)/,
    `[Git Source](${sourceRepository}/blob/${sourceCommit}/contracts/${sourceFile})`,
  );
  body = body.replace(
    /\]\(\/contracts\/([^)#]+)(#[^)]+)?\)/g,
    (_, linked, hash = "") => {
      const resolved = destinations.get(linked);
      if (!resolved) throw new Error(`Unknown generated link ${linked}`);
      return `](/docs/contracts/V2/${resolved.replace(/\.md$/, "")}${hash})`;
    },
  );
  body = body.replace(
    /^(# [^\n]+\n)/,
    `$1\n> Source reference for public revision \`${sourceCommit.slice(0, 7)}\`. For deployed configuration, select the pool's engine on the [parameter page](/docs/contracts/parameters).\n\n`,
  );
  let frontmatter = "";
  try {
    frontmatter =
      (await readFile(target, "utf8")).match(/^---\n[\s\S]*?\n---\n/)?.[0] ??
      "";
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, `${frontmatter}${body.trimEnd()}\n`);
}
console.log(
  `Generated ${files.length} public contract references with stable documentation routes.`,
);
