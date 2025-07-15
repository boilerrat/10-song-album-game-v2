import { create } from '@storacha/client';

const SPACE_DID = 'did:key:z6Mkiv7KFdupdCMQBkdqVHPJTDu3xaUJJYj9RMobps3UrDug';

let client: Awaited<ReturnType<typeof create>> | null = null;

export async function getStorachaClient(email?: string) {
  if (!client) {
    client = await create();
    if (!client.hasSession()) {
      if (!email) throw new Error('Email required for Storacha login');
      await client.login(email); // prompts user to check email
    }
    await client.setCurrentSpace(SPACE_DID);
  }
  return client;
}

export async function putJson(obj: any, email: string): Promise<string> {
  const client = await getStorachaClient(email);
  const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
  const file = new File([blob], 'data.json');
  const cid = await client.uploadFile(file);
  return cid;
}

export function getJsonUrl(cid: string): string {
  return `https://w3s.link/ipfs/${cid}`;
} 