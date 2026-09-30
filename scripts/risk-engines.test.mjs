import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  chains,
  decodeEmas,
  displayValue,
  engines,
  renderTables,
  validateSnapshot,
} from "./risk-engines.mjs";
import { readDeployment } from "./refresh-risk-engines.mjs";

const snapshot = JSON.parse(
  readFileSync(
    new URL("../static/data/risk-engines.json", import.meta.url),
    "utf8",
  ),
);

test("formats different on-chain scales without floating-point rounding", () => {
  assert.equal(displayValue("250", "bps"), "250 bps (2.5%)");
  assert.equal(displayValue("10666667", "ratio7"), "106.66667%");
  assert.equal(displayValue("90000", "ratio4"), "9×");
  assert.deepEqual(decodeEmas("4533471891108855828971580"), [
    60n,
    120n,
    240n,
    960n,
  ]);
  assert.deepEqual(decodeEmas("9066943782217711657943160"), [
    120n,
    240n,
    480n,
    1920n,
  ]);
});

test("preserves both stock token orderings on each chain", () => {
  validateSnapshot(snapshot);
  for (const chainId of [1, 4663]) {
    const regular = snapshot.deployments.find(
      (row) => row.chainId === chainId && row.address === engines[1].address,
    );
    const inverted = snapshot.deployments.find(
      (row) => row.chainId === chainId && row.address === engines[2].address,
    );
    assert.equal(regular.values.CROSS_BUFFER_0, inverted.values.CROSS_BUFFER_1);
    assert.equal(regular.values.CROSS_BUFFER_1, inverted.values.CROSS_BUFFER_0);
    assert.notEqual(
      regular.values.CROSS_BUFFER_0,
      regular.values.CROSS_BUFFER_1,
    );
  }
});

test("rejects incomplete, inconsistent, or unverified snapshots", () => {
  for (const mutate of [
    (data) => data.deployments.pop(),
    (data) => delete data.deployments[0].values.PREMIUM_FEE,
    (data) => (data.deployments[0].values.PREMIUM_FEE = "2.5"),
    (data) => (data.deployments[0].codeHash = `0x${"0".repeat(64)}`),
    (data) => (data.deployments[0].probes.safeMode = ["0", "0"]),
  ]) {
    const copy = structuredClone(snapshot);
    mutate(copy);
    assert.throws(() => validateSnapshot(copy));
  }
});

test("rejects mixed block metadata independently on each chain", () => {
  for (const chain of chains) {
    for (const key of ["blockHash", "blockNumber", "timestamp"]) {
      const copy = structuredClone(snapshot);
      const row = copy.deployments.find((entry) => entry.chainId === chain.id);
      row[key] =
        key === "blockHash"
          ? `0x${"0".repeat(64)}`
          : (BigInt(row[key]) + 1n).toString();
      assert.throws(
        () => validateSnapshot(copy),
        new RegExp(`Mixed ${key} within ${chain.name}`),
      );
    }
  }
});

test("renders stable anchors and chain-specific tables when values differ", () => {
  assert.equal(renderTables(snapshot), renderTables(structuredClone(snapshot)));
  for (const engine of engines)
    assert.ok(renderTables(snapshot).includes(`{#${engine.id}}`));
  const copy = structuredClone(snapshot);
  copy.deployments[3].values.PREMIUM_FEE = "251";
  const output = renderTables(copy);
  assert.ok(output.includes("### Chain 1"));
  assert.ok(output.includes("### Chain 4663"));
  assert.ok(output.includes("251 bps (2.51%)"));
});

test("refuses an address with no runtime or a mismatched release", async () => {
  await assert.rejects(
    readDeployment(
      { getCode: async () => "0x" },
      engines[0],
      { number: 1n },
      "0x",
    ),
    /No runtime/,
  );
  await assert.rejects(
    readDeployment(
      { getCode: async () => "0x01", call: async () => ({ data: "0x02" }) },
      engines[0],
      { number: 1n },
      "0x",
    ),
    /bytecode mismatch/,
  );
});

test("fails when a required getter cannot be read", async () => {
  const client = {
    getCode: async () => "0x01",
    call: async () => ({ data: "0x01" }),
    readContract: async () => {
      throw new Error("missing getter");
    },
  };
  await assert.rejects(
    readDeployment(client, engines[0], { number: 1n }, "0x"),
    /missing getter/,
  );
});
