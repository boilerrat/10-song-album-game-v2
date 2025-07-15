import React, { useState } from "react";
// TODO: Replace with shadcn/ui Dialog import when available
// import { Dialog, DialogTitle, DialogContent, DialogFooter } from "../ui/dialog";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

interface ThemeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (theme: string) => Promise<void>;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({ open, onClose, onSubmit }) => {
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!theme.trim()) {
      setError("Theme cannot be empty");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onSubmit(theme.trim());
      setTheme("");
      onClose();
    } catch (e) {
      setError("Failed to set theme. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <h2 className="text-lg font-bold mb-2">Set the Next Playlist Theme</h2>
        <input
          className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="e.g. Songs for a Rainy Day"
          value={theme}
          onChange={e => setTheme(e.target.value)}
          disabled={loading}
          maxLength={64}
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            onClick={handleSubmit}
            disabled={loading || !theme.trim()}
          >
            {loading ? "Saving..." : "Set Theme"}
          </button>
        </div>
      </div>
    </div>
  );
}; 