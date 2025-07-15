import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

import type { Song, User } from "../../lib/utils/playlist";

interface PlaylistOverviewProps {
  theme: string;
  songs: Song[];
  onAddSong: () => void;
  maxSongs?: number;
}

export const PlaylistOverview: React.FC<PlaylistOverviewProps> = ({ theme, songs, onAddSong, maxSongs = 10 }) => (
  <Card className="mb-4">
    <div className="mb-2">
      <h3 className="text-lg font-bold">Theme: {theme || <span className="italic text-gray-400">No theme set</span>}</h3>
      <div className="text-sm text-gray-500">{songs.length} / {maxSongs} songs</div>
    </div>
    <ul className="mb-2">
      {songs.map((song, idx) => (
        <li key={song.id} className="py-1 border-b last:border-b-0 flex items-center gap-2">
          <span className="font-semibold">{song.title}</span> <span className="text-gray-500">by {song.artist}</span>
          <span className="ml-auto text-xs text-gray-400">@{song.addedBy.username}</span>
        </li>
      ))}
      {songs.length === 0 && <li className="text-gray-400 italic">No songs yet</li>}
    </ul>
    <Button onClick={onAddSong} disabled={songs.length >= maxSongs} className="w-full mt-2">
      {songs.length >= maxSongs ? "Playlist Full" : "Add Song"}
    </Button>
  </Card>
); 