const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Run graphql-markdown command
console.log('Generating initial schema docs...');

// Paths
const schemaBackupPath = path.join(__dirname, '../docs/subgraph/schema.md.bk');

const schemaPath = path.join(__dirname, '../docs/subgraph/schema.md');

// Read files
console.log('Reading files...');
const backupContent = fs.readFileSync(schemaBackupPath, 'utf8');
let schemaContent = fs.readFileSync(schemaPath, 'utf8');

// Process content
console.log('Processing content...');

// Add backup content to top
schemaContent = backupContent + '\n' + schemaContent;

// Remove "Schema Types" header
schemaContent = schemaContent.replace('# Schema Types\n', '');

// Remove details tag with table of contents (Docusaurus generates its own automatically)
schemaContent = schemaContent.replace(/<details>[\s\S]*?<\/details>/m, '');

// Remove Query header and table
const queryIndex = schemaContent.indexOf('## Query');
if (queryIndex !== -1) {
  const afterQuery = schemaContent.slice(queryIndex);
  const tableMatch = afterQuery.match(/(## Query[\s\S]*?<table>[\s\S]*?<\/table>)/);
  if (tableMatch) {
    const contentToRemove = tableMatch[0];
    schemaContent = schemaContent.replace(contentToRemove, '');
  }
}

// Remove Subscription header and table 
const subscriptionIndex = schemaContent.indexOf('## Subscription');
if (subscriptionIndex !== -1) {
  const afterSubscription = schemaContent.slice(subscriptionIndex);
  const tableMatch = afterSubscription.match(/(## Subscription[\s\S]*?<table>[\s\S]*?<\/table>)/);
  if (tableMatch) {
    const contentToRemove = tableMatch[0];
    schemaContent = schemaContent.replace(contentToRemove, '');
  }
}

// Write final content
console.log('Writing updated schema...');
fs.writeFileSync(schemaPath, schemaContent);

console.log('Subgraph documentation generation complete!');
