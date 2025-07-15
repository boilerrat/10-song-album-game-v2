import React, { useState } from "react";
import { ThemeModal } from "../common/ThemeModal";
import { ThemeDiscussion } from "../common/ThemeDiscussion";

// Mock data and API stubs for demonstration
const MOCK_USER = "alice";
const MOCK_AVATAR = undefined;

const initialComments = [
  // Example: { id: "1", user: "bob", text: "Love this theme!", createdAt: new Date().toISOString() }
];

export const ThemeManager: React.FC = () => {
  const [theme, setTheme] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState(initialComments);

  // Simulate playlist completion
  React.useEffect(() => {
    if (!theme) setShowModal(true);
  }, [theme]);

  const handleSetTheme = async (newTheme: string) => {
    // TODO: Save theme to backend (IPFS/VPS)
    setTheme(newTheme);
    setShowModal(false);
  };

  const handleAddComment = async (text: string) => {
    // TODO: Save comment to backend
    setComments(prev => [
      {
        id: Math.random().toString(36).slice(2),
        user: MOCK_USER,
        avatarUrl: MOCK_AVATAR,
        text,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <ThemeModal open={showModal} onClose={() => setShowModal(false)} onSubmit={handleSetTheme} />
      {theme && (
        <ThemeDiscussion
          theme={theme}
          comments={comments}
          onAddComment={handleAddComment}
          currentUser={MOCK_USER}
        />
      )}
      {!theme && <div className="mt-8 text-lg text-gray-600">Waiting for theme to be set...</div>}
    </div>
  );
}; 