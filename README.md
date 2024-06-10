# Panoptic Documentation

This is the main website of <a href="http://panoptic.xyz/">Panoptic</a>.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

You can use the `build.sh` file to build the documentation:

```
$ ./build.sh
```

This command generates static content into the `build` directory and can be served using any static contents hosting service. It also ensures that the Glossary is updated.

### Subgraph docs
You can generate subgraph docs into the `subgraph-generated` directory by running `yarn graphql-to-doc`.
Currently, some of the generated files (especially the category.yml files) have been manually modified to hide extraneous sidebar items and provide more context. Keep in mind a bit of manualy copying of generated files into to the main `subgraph` directory will be needed to stay up to date with any schema changes.

### Glossary

You can generate the glossary with:

```
$ ./glossary.sh
```

### Build the Glossary

We use the plugin here: https://gitlab.grnet.gr/terminology/docusaurus-terminology to manage our glossary. Build the glossary with:

```
$ yarn docusaurus parse
$ yarn docusaurus glossary
```

### Acknowledgements

Built using [Docusaurus 2](https://docusaurus.io/).

### Copyright

Copyright © 2023 Axicon Labs Limited. All Rights Reserved. Panoptic™ is a trademark of Axicon Labs Inc. All other trademarks and registered trademarks are the sole property of their respective owners.

