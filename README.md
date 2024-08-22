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

### Glossary

You can generate the glossary with:

```
$ ./glossary.sh
```

### Subgraph docs

To generate subgraph docs, run

```sh
yarn graphql-markdown
```

Now, some manual cleanup steps are needed to improve readability (should automate in the future):

* Copy the contents of `subgraph/schema.md.bk` and paste them into the top of the generated `schema.md` file.
* Remove "# Schema Types" header
* Delete the `<details>` tag with table of contents (Docusaurus generates this automatically)
* Starting from the `## Query` header, delete the `<table>` element.


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
