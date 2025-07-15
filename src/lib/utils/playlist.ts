import { putJson, getJsonUrl } from './ipfs';

export interface User {
  fid: number;
  username: string;
  pfp: string;
}

export interface Song {
  id: string; // unique (e.g., YouTube ID or hash)
  title: string;
  artist: string;
  url: string;
  addedBy: User;
  addedAt: string; // ISO date
}

export interface Playlist {
  id: string; // uuid or hash
  theme: string;
  songs: Song[];
  createdBy: User;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

/**
 * Uploads a playlist to IPFS and returns the CID.
 */
export async function savePlaylistToIpfs(playlist: Playlist, email: string): Promise<string> {
  return putJson(playlist, email);
}

/**
 * Returns a public gateway URL for a playlist by CID.
 */
export function getPlaylistUrl(cid: string): string {
  return getJsonUrl(cid);
} 