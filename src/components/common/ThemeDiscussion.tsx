import React, { useState } from "react";

interface Comment {
  id: string;
  user: string;
  avatarUrl?: string;
  text: string;
  createdAt: string;
}

interface ThemeDiscussionProps {
  theme: string;
  comments: Comment[];
  onAddComment: (text: string) => Promise<void>;
  currentUser: string;
}

export const ThemeDiscussion: React.FC<ThemeDiscussionProps> = ({ theme, comments, onAddComment, currentUser }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddComment = async () => {
    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onAddComment(comment.trim());
      setComment("");
    } catch (e) {
      setError("Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full max-w-md mx-auto mt-4">
      <h3 className="text-md font-semibold mb-2">Theme Discussion</h3>
      <div className="mb-3 text-purple-700 font-bold">Current Theme: <span className="font-normal text-black">{theme}</span></div>
      <div className="space-y-2 max-h-48 overflow-y-auto mb-2">
        {comments.length === 0 && <div className="text-gray-400 text-sm">No comments yet. Start the conversation!</div>}
        {comments.map(c => (
          <div key={c.id} className="flex items-start gap-2">
            {c.avatarUrl ? (
              <img src={c.avatarUrl} alt={c.user} className="w-7 h-7 rounded-full" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold">
                {c.user[0].toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <div className="text-xs text-gray-500">{c.user} <span className="ml-1">{new Date(c.createdAt).toLocaleTimeString()}</span></div>
              <div className="text-sm text-gray-800">{c.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Add a comment..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          disabled={loading}
          maxLength={128}
        />
        <button
          className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold"
          onClick={handleAddComment}
          disabled={loading || !comment.trim()}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
}; 