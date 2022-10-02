# Panoptic Documentation



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

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Build the Glossary

We use the plugin here: https://gitlab.grnet.gr/terminology/docusaurus-terminology to manage our glossary. Build the glossary with:

```
$ yarn docusaurus parse
$ yarn docusaurus glossary
```

### Acknowledgements

Built using [Docusaurus 2](https://docusaurus.io/).
