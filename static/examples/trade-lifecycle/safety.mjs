export const FORK_BLOCK = 26107609n
export const SANDBOX_CHAIN_ID = 31337
export const LOCAL_RPC = 'http://127.0.0.1:8547'

export async function requireSandbox(client) {
  if ((await client.getChainId()) !== SANDBOX_CHAIN_ID) {
    throw new Error('Expected sandbox chain 31337; refusing to write')
  }
  const version = await client.request({ method: 'web3_clientVersion' })
  if (!version.toLowerCase().includes('anvil')) {
    throw new Error('Expected Anvil; refusing to write')
  }
  const info = await client.request({ method: 'anvil_nodeInfo' })
  if (BigInt(info.forkConfig?.forkBlockNumber ?? 0) !== FORK_BLOCK) {
    throw new Error('Expected the documented fork block; restart the sandbox')
  }
}
