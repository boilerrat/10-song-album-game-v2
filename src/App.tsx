import React from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import SplashScreen from './components/common/SplashScreen';
import LoginButton from './components/common/LoginButton';
import UserInfo from './components/common/UserInfo';
import PlaylistDemo from './components/pages/PlaylistDemo';

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <SplashScreen />;
  if (!user) return <LoginButton />;
  return (
    <div style={{ padding: 24 }}>
      <UserInfo />
      <h1>Welcome to the 10 Song Album Game!</h1>
      <PlaylistDemo />
      {/* Main app content goes here */}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
