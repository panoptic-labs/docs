# Panoptic Documentation

This is the main website of <a href="http://panoptic.xyz/">Panoptic</a>.

> [!NOTE]
> This public repository is an automated mirror of Panoptic's canonical
> monorepo. Direct commits and pull requests here may be overwritten. Please
> open an issue before proposing a documentation change.

The monorepo migration was verified against public docs commit
`6c9b4132582dd598181b1954c28c4cc9432a5cd3`.

### Installation

```
$ pnpm install
```

### Local Development

```
$ nvm use
$ pnpm start
```

This command switches you onto the correct version of node and starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

When working from the Panoptic monorepo, run commands from its root with
`pnpm --filter @panoptic-eng/docs <command>`.

### Build

You can use the `build.sh` file to build the documentation:

```
$ ./build.sh
```

This command generates static content into the `build` directory and can be served using any static contents hosting service. It also ensures that the Glossary is updated.

### Agent documentation index

`static/llms.txt` is the curated index served at `https://panoptic.xyz/llms.txt`.
Docusaurus copies it unchanged into the build. The postbuild step exports rendered
documentation articles to `/docs/<route>.md` before verifying every indexed local
URL and fragment. Markdown preserves tables, code, math, heading anchors, and
rendered component content, while removing navigation and interactive controls.
Links between exported pages use Markdown URLs; assets and other links are absolute.
Generated Markdown lives only in `build/` and is refreshed with every production
build. The development server does not run this export; use `build` and `serve`
to preview it. Update the curated index alongside route and documentation changes.

### Deployed RiskEngine parameters

`static/data/risk-engines.json` records finalized-block observations for the three
active engines on Ethereum and Robinhood. It contains public addresses, raw getter
values, block hashes, runtime hashes, and read-only boundary-probe results. The
refresh also compares deployed runtime with a read-only execution of the pinned
public release's creation bytecode. This establishes release-artifact correspondence;
it does not claim that recompiling an arbitrary checkout reproduces that bytecode.

Set `ETHEREUM_RPC_URL` and `ROBINHOOD_RPC_URL` in your environment, then run:

```sh
pnpm --filter @panoptic-eng/docs refresh:risk-engines
```

The refresh is explicit and never runs in CI or during the site build. It fails
without writing a snapshot if a chain, required getter, deployment, bytecode
comparison, or boundary check fails. RPC error details are suppressed to avoid
logging credential-bearing endpoints. The checked-in snapshot and generated
parameter tables should be reviewed together.

The getter inventory, active-engine list, and public source revision are maintained
in `scripts/risk-engines.mjs`. Ratios are formatted with bigint arithmetic. Edit
human explanations outside the generated markers in `docs/contracts/parameters.md`.
After a snapshot change, `generate:risk-tables` updates those tables; `check:risk-tables`
checks them without writing. The build checks for stale tables and requires no RPC.

### Public contract references

To regenerate the v2 references, check out `panoptic-labs/panoptic-v2-core` at the
exact `sourceCommit` in `scripts/risk-engines.mjs`, initialize its dependency
submodules, install Foundry, then run:

```sh
pnpm --filter @panoptic-eng/docs generate:contracts /absolute/path/to/public-core
```

This runs `forge doc` with the production profile (no Solidity tests), normalizes
internal links, applies implementation-verified description corrections, pins
public source links, and retains existing v3 documentation routes despite the public
repository's explicit `V3` contract names. The generated pages state their source revision; deployed configuration belongs on the parameter
page, not in hand-edited generated references.

### Verification

```sh
pnpm --filter @panoptic-eng/docs lint
pnpm --filter @panoptic-eng/docs test
pnpm --filter @panoptic-eng/docs build
pnpm --filter @panoptic-eng/docs serve --host 127.0.0.1 --port 3000 --no-open
```

Verify `/llms.txt` returns HTTP 200 and `text/plain`, with bytes matching its source.
Check every listed URL and fragment against the build and the public site. New
routes can only resolve publicly after deployment. Docusaurus does not validate
links inside static text files. Its v2 preview server returns 404 for some dotted
contract routes even when the generated `build/<route>/index.html` exists; inspect
those artifacts and their canonical URLs directly.

### Glossary

You can generate the glossary with:

```
$ ./glossary.sh
```

### Subgraph docs

Generate both Ethereum and Robinhood `v2_prod` references from public introspection:

```sh
pnpm --filter @panoptic-eng/docs graphql-markdown
pnpm --filter @panoptic-eng/docs test:subgraph
pnpm --filter @panoptic-eng/docs lint:subgraph
```

The generator records each deployment ID and schema hash. The check validates and executes every GraphQL example in `docs/subgraph/queries.md` against both endpoints, including cursor pagination and real open-position records. These commands require network access; the normal docs build uses checked-in files. Do not substitute a Sepolia schema for a production reference.

The SDK quickstart in `docs/developers/v2-integration.md` is pinned to public package version 1.0.25. When changing its example, install that version in a temporary ESM project, typecheck the snippet, and run its read-only calls against a documented v2 pool. Never add transaction submission to the verification step.

### Build the Glossary

We use the plugin here: https://gitlab.grnet.gr/terminology/docusaurus-terminology to manage our glossary. Build the glossary with:

```
$ pnpm docusaurus parse
$ pnpm docusaurus glossary
```

### Acknowledgements

Built using [Docusaurus 2](https://docusaurus.io/).

### Copyright

Copyright © 2023 Axicon Labs Limited. All Rights Reserved. Panoptic™ is a trademark of Axicon Labs Inc. All other trademarks and registered trademarks are the sole property of their respective owners.

## Proxy setup

How Docusaurus and Webflow are configured to play nice with each other.

If you run this locally and compare the local root route, localhost:3000, to the deployed root route, panoptic.xyz/, you may notice the two homepages are different. However, nested routes from the Docusaurus site like /blog or /docs are identical.

This is because the homepage displayed in production is hosted on Webflow, while nested paths are hosted on our Docusaurus site on Vercel, using a Cloudflare Worker as a reverse proxy.

You can see details about the worker, including the request proxying code, [here](https://dash.cloudflare.com/f815d14bd6670e4289e3cd291337ecf4/workers/services/view/panoptic-homepage-proxy/production/metrics).

If you check the [workers bindings](https://dash.cloudflare.com/f815d14bd6670e4289e3cd291337ecf4/workers/services/view/panoptic-homepage-proxy/production/settings#bindings), you'll see that it runs on requests to `panoptic.xyz/*`.

The actual code that runs in the Worker is very simple: it intercepts requests to the root path (`/`), requests the Webflow site (configured to live on `home.panoptic.xyz` in our DNS records) and returns the Webflow site in the response.

For all other requests, like /blog or /docs, a request is made to our Vercel Docusaurus site's production deployment URL at `https://docs-bqp0f6xid-panoptic.vercel.app`.


## Editorial update dates

Keep the original blog/research publication date and dated filename when revising an article. For a substantial revision (new examples, research, corrections or merged explanations), set an explicit quoted calendar date in front matter:

```yaml
editorial_update: "2026-10-04"
```

Use the actual editorial revision date, never a future scheduled date. Do not advance it for link maintenance, canonical tags, formatting or title/version labels alone. Pages without this field retain their publication-only display; docs do not acquire an invented publication date. Dates are formatted in UTC to avoid a one-day shift across visitor time zones.

Blog and research pages display Published and Updated dates; their BlogPosting microdata supplies `datePublished` and `dateModified`, with matching article metadata. Docs display Last updated and expose `dateModified` in WebPage structured data. The field is editorially maintained, not inferred from Git activity or build time.
