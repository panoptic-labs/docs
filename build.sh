echo "🔨 building..."

yarn build
yarn graphql-to-doc
yarn docusaurus parse
yarn docusaurus glossary
