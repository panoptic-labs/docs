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

### Glossary

You can generate the glossary with:

```
$ ./glossary.sh
```

### Subgraph docs

To generate subgraph docs, run

```sh
pnpm graphql-markdown
```

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
