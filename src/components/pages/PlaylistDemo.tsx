import React, { useState } from 'react';
import { PlaylistOverview } from '../common/PlaylistOverview';
import { AddSongModal } from '../common/AddSongModal';
import SplashScreen from '../common/SplashScreen';
import { ThemeManager } from "./ThemeManager";
import { Song, User } from '../../lib/utils/playlist';

const demoUser: User = {
  fid: 123,
  username: 'demo_user',
  pfp: '',
};

function uuid() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

const PlaylistDemo: React.FC = () => {
  const [theme, setTheme] = useState('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [showAddSong, setShowAddSong] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Splash screen logic
  if (showSplash) {
    return <SplashScreen onReady={() => setShowSplash(false)} />;
  }

  // Add song handler
  const handleAddSong = async (song: { title: string; artist: string; url: string }) => {
    setLoading(true);
    setError(null);
    // Simple duplicate check (by title+artist)
    if (songs.some(s => s.title === song.title && s.artist === song.artist)) {
      setError('Duplicate song');
      setLoading(false);
      return;
    }
    setSongs([
      ...songs,
      {
        id: uuid(),
        title: song.title,
        artist: song.artist,
        url: song.url,
        addedBy: demoUser,
        addedAt: new Date().toISOString(),
      },
    ]);
    setShowAddSong(false);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Playlist Demo</h2>
      <PlaylistOverview
        theme={theme}
        songs={songs}
        onAddSong={() => setShowAddSong(true)}
      />
      <AddSongModal
        open={showAddSong}
        onClose={() => setShowAddSong(false)}
        onSubmit={handleAddSong}
        loading={loading}
      />
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      {/* ThemeManager for demo/testing */}
      <ThemeManager />
    </div>
  );
};

export default PlaylistDemo; 