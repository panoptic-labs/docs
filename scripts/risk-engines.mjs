import assert from "node:assert/strict";
import { formatUnits, parseAbi } from "viem";

export const sourceCommit = "e3b9d125f929a5a8c7220ec6467613686939edae";
export const sourceRepository =
  "https://github.com/panoptic-labs/panoptic-v2-core";
export const engines = [
  {
    id: "crypto-blue-chip",
    name: "Crypto blue chip",
    address: "0x000000000000075e29cdaa9cb640a69e148ca7da",
    source: "RiskEngine.sol",
    release: "deployment-info-RiskEngine.json",
  },
  {
    id: "stocks",
    name: "Stocks",
    address: "0x0000000000000fe1e261f66ce2f44def4f5ae0cb",
    source: "RiskEngineXStocks.sol",
    release: "deployment-info-RiskEngineXStocks.json",
  },
  {
    id: "stocks-inverted",
    name: "Stocks, inverted token ordering",
    address: "0x0000000000000f3fb82469581a74776178e76ca4",
    source: "RiskEngineXStocks.sol",
    release: "deployment-info-RiskEngineXStocks.json",
  },
];
export const chains = [
  { id: 1, name: "Ethereum", rpcEnv: "ETHEREUM_RPC_URL" },
  { id: 4663, name: "Robinhood", rpcEnv: "ROBINHOOD_RPC_URL" },
];
export const groups = {
  "Fees and liquidity": {
    NOTIONAL_FEE: "bps",
    PREMIUM_FEE: "bps",
    PROTOCOL_SPLIT: "bps",
    BUILDER_SPLIT: "bps",
    VEGOID: "integer",
    MAX_SPREAD: "ratio4",
  },
  "Collateral and solvency": {
    DECIMALS: "integer",
    SELLER_COLLATERAL_RATIO: "ratio7",
    BUYER_COLLATERAL_RATIO: "ratio7",
    MAINT_MARGIN_RATE: "ratio7",
    TARGET_POOL_UTIL: "ratio7",
    SATURATED_POOL_UTIL: "ratio7",
    BP_DECREASE_BUFFER: "ratio7",
    CROSS_BUFFER_0: "ratio7",
    CROSS_BUFFER_1: "ratio7",
    MAX_OPEN_LEGS: "integer",
    MAX_BONUS: "ratio7",
    FORCE_EXERCISE_COST: "ratio7",
  },
  "Oracle and interest": {
    EMA_PERIODS: "emas",
    MAX_TICKS_DELTA: "ticks",
    MAX_TWAP_DELTA_DISPATCH: "ticks",
    MAX_CLAMP_DELTA: "ticks",
    TARGET_UTILIZATION: "ratio18",
    CURVE_STEEPNESS: "wad",
    MIN_RATE_AT_TARGET: "rate",
    MAX_RATE_AT_TARGET: "rate",
    INITIAL_RATE_AT_TARGET: "rate",
    ADJUSTMENT_SPEED: "rate",
    IRM_MAX_ELAPSED_TIME: "seconds",
  },
};
export const parameterNames = Object.values(groups).flatMap(Object.keys);
export const abi = parseAbi([
  ...parameterNames.map((name) => `function ${name}() view returns (uint256)`),
  "function isSafeMode(int24 currentTick, uint256 oraclePack) view returns (uint8)",
  "function crossBufferRatio(int256 utilization, uint256 crossBuffer) view returns (uint256)",
]);

export function decodeEmas(value) {
  return [0n, 24n, 48n, 72n].map(
    (shift) => (BigInt(value) >> shift) & ((1n << 24n) - 1n),
  );
}

export function displayValue(value, unit) {
  const n = BigInt(value);
  switch (unit) {
    case "bps":
      return `${value} bps (${formatUnits(n, 2)}%)`;
    case "ratio4":
      return `${formatUnits(n, 4)}×`;
    case "ratio7":
      return `${formatUnits(n, 5)}%`;
    case "ratio18":
      return `${formatUnits(n, 16)}%`;
    case "wad":
      return `${formatUnits(n, 18)}×`;
    case "rate":
      return `${formatUnits(n, 18)} per second (WAD)`;
    case "emas":
      return `${decodeEmas(n).join(" / ")} seconds (spot / fast / slow / eons)`;
    case "ticks":
      return `${value} ticks`;
    case "seconds":
      return `${value} seconds`;
    default:
      return value;
  }
}

export function validateSnapshot(snapshot) {
  assert.equal(
    snapshot.sourceCommit,
    sourceCommit,
    "Unexpected public source revision",
  );
  assert.equal(
    snapshot.deployments.length,
    engines.length * chains.length,
    "Missing deployments",
  );
  for (const chain of chains) {
    const records = snapshot.deployments.filter(
      (row) => row.chainId === chain.id,
    );
    for (const key of ["blockHash", "blockNumber", "timestamp"])
      assert.equal(
        new Set(records.map((row) => row[key])).size,
        1,
        `Mixed ${key} within ${chain.name}`,
      );
    for (const engine of engines) {
      const matches = records.filter((row) => row.address === engine.address);
      assert.equal(
        matches.length,
        1,
        `Missing or duplicate ${engine.id} on ${chain.name}`,
      );
      const row = matches[0];
      for (const key of ["blockHash", "codeHash", "releaseRuntimeHash"])
        assert.match(row[key], /^0x[0-9a-f]{64}$/);
      assert.equal(
        row.codeHash,
        row.releaseRuntimeHash,
        "Release bytecode differs from deployed runtime",
      );
      for (const key of ["blockNumber", "timestamp"])
        assert.match(row[key], /^[1-9][0-9]*$/);
      for (const name of parameterNames)
        assert.match(
          row.values[name] ?? "",
          /^[0-9]+$/,
          `Missing or invalid ${name}`,
        );
      assert.equal(row.values.DECIMALS, "10000000", "Unsupported ratio scale");
      assert.ok(
        decodeEmas(row.values.EMA_PERIODS).every((period) => period > 0n),
        "Invalid EMA periods",
      );
      assert.ok(
        BigInt(row.values.PROTOCOL_SPLIT) + BigInt(row.values.BUILDER_SPLIT) <=
          10000n,
        "Invalid fee split",
      );
      assert.deepEqual(
        row.probes.safeMode,
        ["0", "1"],
        "Unexpected safe-mode boundary",
      );
      for (const token of ["0", "1"]) {
        const buffer = BigInt(row.values[`CROSS_BUFFER_${token}`]);
        assert.deepEqual(
          row.probes[`crossBuffer${token}`],
          [buffer.toString(), (buffer / 2n).toString(), "0"],
          "Unexpected cross-buffer curve",
        );
      }
    }
  }
}

export function renderTables(snapshot) {
  validateSnapshot(snapshot);
  return engines
    .map((engine) => {
      const rows = snapshot.deployments.filter(
        (row) => row.address === engine.address,
      );
      const first = rows[0];
      const sameValues = rows.every(
        (row) => JSON.stringify(row.values) === JSON.stringify(first.values),
      );
      const table = (values) =>
        Object.entries(groups)
          .map(
            ([group, fields]) =>
              `### ${group}\n\n| Getter | Raw value | Interpretation |\n| --- | --- | --- |\n${Object.entries(
                fields,
              )
                .map(
                  ([name, unit]) =>
                    `| \`${name}\` | \`${values[name]}\` | ${displayValue(values[name], unit)} |`,
                )
                .join("\n")}`,
          )
          .join("\n\n");
      const evidence = rows
        .map(
          (row) =>
            `- **${chains.find((chain) => chain.id === row.chainId)?.name} (chain ${row.chainId})**: block \`${row.blockNumber}\`, ${new Date(Number(BigInt(row.timestamp) * 1000n)).toISOString()}; runtime hash \`${row.codeHash}\`.`,
        )
        .join("\n");
      const content = sameValues
        ? `Values match on both chains at the recorded blocks.\n\n${table(first.values)}`
        : rows
            .map((row) => `### Chain ${row.chainId}\n\n${table(row.values)}`)
            .join("\n\n");
      return `## ${engine.name} {#${engine.id}}\n\nAddress: \`${engine.address}\`.\n\n[Public source](${sourceRepository}/blob/${sourceCommit}/contracts/${engine.source}) · [Release artifact](${sourceRepository}/blob/${sourceCommit}/${engine.release})\n\n${evidence}\n\n${content}`;
    })
    .join("\n\n");
}
