from fastapi import FastAPI, HTTPException, Request, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List
import subprocess
import tempfile
import json
import os

from datetime import datetime
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

class User(BaseModel):
    fid: int
    username: str
    pfp: str

class Song(BaseModel):
    id: str
    title: str
    artist: str
    url: str
    addedBy: User
    addedAt: str

class Playlist(BaseModel):
    id: str
    theme: str
    songs: List[Song]
    createdBy: User
    createdAt: str
    updatedAt: str

# In-memory storage for playlists (id -> Playlist)
playlists = {}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/upload_playlist")
def upload_playlist(playlist: Playlist):
    """
    Accepts a playlist, writes it to a temp file, and calls a Node.js script to upload to Storacha.
    Returns the CID.
    """
    try:
        with tempfile.NamedTemporaryFile(mode='w+', suffix='.json', delete=False) as tmp:
            json.dump(playlist.dict(), tmp)
            tmp.flush()
            tmp_path = tmp.name
        # Call a Node.js script to upload the file and return the CID
        # (You must implement backend/upload_to_storacha.js)
        result = subprocess.run([
            'node', 'backend/upload_to_storacha.js', tmp_path
        ], capture_output=True, text=True)
        os.unlink(tmp_path)
        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=f"Storacha upload failed: {result.stderr}")
        cid = result.stdout.strip()
        return {"cid": cid}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/playlist/{playlist_id}")
def get_playlist(playlist_id: str):
    playlist = playlists.get(playlist_id)
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    return playlist

class AddSongRequest(BaseModel):
    song: Song

@app.post("/playlist/{playlist_id}/add_song")
def add_song_to_playlist(playlist_id: str, req: AddSongRequest):
    playlist = playlists.get(playlist_id)
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    # Rule 1: 10-song limit
    if len(playlist.songs) >= 10:
        raise HTTPException(status_code=400, detail="Playlist already has 10 songs")
    # Rule 2: One song per user per playlist
    user_fid = req.song.addedBy.fid
    for song in playlist.songs:
        if song.addedBy.fid == user_fid:
            raise HTTPException(status_code=400, detail="User has already added a song to this playlist")
    # Rule 3: No duplicate songs (by id or url)
    for song in playlist.songs:
        if song.id == req.song.id or song.url == req.song.url:
            raise HTTPException(status_code=400, detail="Duplicate song in playlist")
    # Rule 4: Validate song availability (stub)
    if not is_song_available(req.song):
        raise HTTPException(status_code=400, detail="Song not available (stub)")
    # Add song
    playlist.songs.append(req.song)
    playlist.updatedAt = datetime.utcnow().isoformat()
    return {"message": "Song added", "playlist": playlist}

def is_song_available(song: Song) -> bool:
    # TODO: Implement real YouTube API check
    # For now, always return True
    return True

@app.post("/playlist")
def create_playlist(playlist: Playlist):
    if playlist.id in playlists:
        raise HTTPException(status_code=400, detail="Playlist already exists")
    playlists[playlist.id] = playlist
    return {"message": "Playlist created", "playlist": playlist}

class WebhookNotification(BaseModel):
    event_type: str = Field(..., description="Type of event: playlist_completed or playlist_started")
    event_data: dict = Field(..., description="Event-specific data")

WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET", "changeme")

@app.post("/webhook/notify")
async def webhook_notify(
    payload: WebhookNotification,
    x_webhook_secret: str = Header(None)
):
    """
    Receives notifications for playlist events. Validates secret header.
    """
    if x_webhook_secret != WEBHOOK_SECRET:
        raise HTTPException(status_code=401, detail="Invalid webhook secret")
    if payload.event_type not in ("playlist_completed", "playlist_started"):
        raise HTTPException(status_code=400, detail="Invalid event_type")
    # Log the event (replace with real notification logic as needed)
    print(f"[Webhook] Event: {payload.event_type} | Data: {payload.event_data}")
    return {"status": "received", "event_type": payload.event_type}
