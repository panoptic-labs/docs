import { spawn } from 'node:child_process'
import { FORK_BLOCK, SANDBOX_CHAIN_ID } from './safety.mjs'

const rpc = process.env.ETHEREUM_RPC_URL
if (!rpc)
  throw new Error(
    'Set ETHEREUM_RPC_URL to a full Ethereum archive RPC endpoint',
  )
const child = spawn(
  'anvil',
  [
    '--host',
    '127.0.0.1',
    '--port',
    '8547',
    '--chain-id',
    String(SANDBOX_CHAIN_ID),
    '--fork-url',
    rpc,
    '--fork-block-number',
    String(FORK_BLOCK),
    '--silent',
  ],
  { stdio: 'ignore' },
)
child.on('error', () => {
  console.error('Could not start Anvil. Install it and check your PATH.')
  process.exitCode = 1
})
child.on('exit', (code) => {
  if (code)
    console.error(
      'Anvil exited. Check the archive RPC and that port 8547 is free.',
    )
  process.exitCode = code ?? 0
})
for (const signal of ['SIGINT', 'SIGTERM'])
  process.on(signal, () => child.kill(signal))
console.log(
  'Starting sandbox on 127.0.0.1:8547; run pnpm status in another terminal to check readiness.',
)
