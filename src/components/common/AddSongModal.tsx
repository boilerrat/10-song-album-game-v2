import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { User } from "../../lib/utils/playlist";

interface AddSongModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (song: { title: string; artist: string; url: string }) => Promise<void>;
  loading?: boolean;
}

export const AddSongModal: React.FC<AddSongModalProps> = ({ open, onClose, onSubmit, loading }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const urlInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && urlInputRef.current) {
      urlInputRef.current.focus();
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!title.trim() || !artist.trim() || !url.trim()) {
      setError("All fields are required");
      return;
    }
    setError("");
    await onSubmit({ title, artist, url });
    setTitle("");
    setArtist("");
    setUrl("");
  };

  return (
    <Dialog open={open} onOpenChange={v => !loading && v === false && onClose()}>
      <div className="mb-2">
        <h3 className="text-lg font-bold mb-2">Add a Song</h3>
        <Input placeholder="Song Title" value={title} onChange={e => setTitle(e.target.value)} className="mb-2" />
        <Input placeholder="Artist" value={artist} onChange={e => setArtist(e.target.value)} className="mb-2" />
        <Input placeholder="YouTube URL" value={url} onChange={e => setUrl(e.target.value)} className="mb-2" ref={urlInputRef} />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? "Adding..." : "Add Song"}
        </Button>
        <Button onClick={onClose} variant="secondary" className="w-full mt-2" disabled={loading}>
          Cancel
        </Button>
      </div>
    </Dialog>
  );
}; 