import { mkdir, writeFile } from "node:fs/promises";
import { createPublicClient, http, keccak256 } from "viem";
import {
  abi,
  chains,
  engines,
  parameterNames,
  sourceCommit,
  validateSnapshot,
} from "./risk-engines.mjs";

export async function readDeployment(client, engine, block, initcode) {
  const code = await client.getCode({
    address: engine.address,
    blockNumber: block.number,
  });
  if (!code || code === "0x")
    throw new Error(`No runtime code for ${engine.id}`);
  const { data: runtime } = await client.call({
    data: initcode,
    blockNumber: block.number,
  });
  if (!runtime || keccak256(runtime) !== keccak256(code))
    throw new Error(`Public release bytecode mismatch for ${engine.id}`);
  const read = (functionName, args) =>
    client.readContract({
      address: engine.address,
      abi,
      functionName,
      args,
      blockNumber: block.number,
    });
  const values = Object.fromEntries(
    await Promise.all(
      parameterNames.map(async (name) => [name, (await read(name)).toString()]),
    ),
  );
  const halfDelta = BigInt(values.MAX_TICKS_DELTA) / 2n;
  const safeMode = await Promise.all(
    [halfDelta, halfDelta + 1n].map(async (tick) =>
      (await read("isSafeMode", [0, tick << 164n])).toString(),
    ),
  );
  const probes = { safeMode };
  for (const token of ["0", "1"])
    probes[`crossBuffer${token}`] = await Promise.all(
      [9000n, 9250n, 9500n].map(async (utilization) =>
        (
          await read("crossBufferRatio", [
            utilization,
            BigInt(values[`CROSS_BUFFER_${token}`]),
          ])
        ).toString(),
      ),
    );
  return {
    address: engine.address,
    blockNumber: block.number.toString(),
    blockHash: block.hash,
    timestamp: block.timestamp.toString(),
    codeHash: keccak256(code),
    releaseRuntimeHash: keccak256(runtime),
    values,
    probes,
  };
}

async function main() {
  const releases = new Map();
  for (const filename of new Set(engines.map((engine) => engine.release))) {
    const response = await fetch(
      `https://raw.githubusercontent.com/panoptic-labs/panoptic-v2-core/${sourceCommit}/${filename}`,
    );
    if (!response.ok) throw new Error(`Cannot read public release ${filename}`);
    releases.set(filename, await response.json());
  }
  const snapshot = { sourceCommit, deployments: [] };
  for (const chain of chains) {
    const url = process.env[chain.rpcEnv];
    if (!url) throw new Error(`Set ${chain.rpcEnv}`);
    const client = createPublicClient({
      transport: http(url, { retryCount: 1, timeout: 20000 }),
    });
    if ((await client.getChainId()) !== chain.id)
      throw new Error(`Wrong chain for ${chain.name}`);
    const block = await client.getBlock({ blockTag: "finalized" });
    for (const engine of engines) {
      const artifact = releases
        .get(engine.release)
        .logicContracts.find(
          (contract) => contract.address.toLowerCase() === engine.address,
        );
      if (!artifact?.initcode)
        throw new Error(`Missing release artifact for ${engine.id}`);
      const row = await readDeployment(
        client,
        engine,
        block,
        artifact.initcode,
      );
      snapshot.deployments.push({ chainId: chain.id, ...row });
      console.log(
        `Verified ${engine.id} on ${chain.name} at block ${block.number}`,
      );
    }
  }
  validateSnapshot(snapshot);
  const output = new URL("../static/data/risk-engines.json", import.meta.url);
  await mkdir(new URL("../static/data/", import.meta.url), { recursive: true });
  await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`);
}

if (process.argv[1]?.endsWith("/refresh-risk-engines.mjs")) {
  main().catch(() => {
    console.error(
      "RiskEngine refresh failed. Check RPC configuration, chain IDs, getters, and the pinned public release. No snapshot was written; RPC error details are suppressed to protect credentials.",
    );
    process.exitCode = 1;
  });
}
