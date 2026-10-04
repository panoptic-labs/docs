import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  FORK_BLOCK,
  SANDBOX_CHAIN_ID,
  LOCAL_RPC,
  requireSandbox,
} from './safety.mjs'

test('refuses a live chain before calling node-specific methods', async () => {
  await assert.rejects(
    requireSandbox({
      getChainId: async () => 1,
      request: async () => assert.fail('Must stop before further RPC calls'),
    }),
    /Expected sandbox chain/,
  )
})

test('refuses a non-Anvil node even with the sandbox chain ID', async () => {
  await assert.rejects(
    requireSandbox({
      getChainId: async () => SANDBOX_CHAIN_ID,
      request: async ({ method }) => {
        assert.equal(method, 'web3_clientVersion')
        return 'Geth'
      },
    }),
    /Expected Anvil/,
  )
})

test('refuses an unforked node and the wrong fork block', async () => {
  for (const forkConfig of [
    undefined,
    { forkBlockNumber: Number(FORK_BLOCK - 1n) },
  ]) {
    await assert.rejects(
      requireSandbox({
        getChainId: async () => SANDBOX_CHAIN_ID,
        request: async ({ method }) =>
          method === 'web3_clientVersion' ? 'anvil/v1' : { forkConfig },
      }),
      /Expected the documented fork block/,
    )
  }
})

test('accepts the documented local fork and fixes the write endpoint to loopback', async () => {
  assert.equal(new URL(LOCAL_RPC).hostname, '127.0.0.1')
  await requireSandbox({
    getChainId: async () => SANDBOX_CHAIN_ID,
    request: async ({ method }) =>
      method === 'web3_clientVersion'
        ? 'anvil/v1'
        : { forkConfig: { forkBlockNumber: Number(FORK_BLOCK) } },
  })
})
