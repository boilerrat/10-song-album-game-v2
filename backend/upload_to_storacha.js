#!/usr/bin/env node
const { create } = require('@storacha/client');
const fs = require('fs');
const path = require('path');

const SPACE_DID = 'did:key:z6Mkiv7KFdupdCMQBkdqVHPJTDu3xaUJJYj9RMobps3UrDug';

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: upload_to_storacha.js <json_file>');
    process.exit(1);
  }
  const client = await create();
  // Assumes the agent is already authorized for the space (see docs for persistent agent setup)
  await client.setCurrentSpace(SPACE_DID);
  const data = fs.readFileSync(filePath);
  const file = new File([data], path.basename(filePath), { type: 'application/json' });
  const cid = await client.uploadFile(file);
  console.log(cid);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}); 