import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const LoginButton: React.FC = () => {
  const { signin, isLoading } = useAuth();
  return (
    <button onClick={signin} disabled={isLoading} style={{ padding: '12px 24px', fontSize: 18, borderRadius: 8, background: '#7b3fe4', color: '#fff', border: 'none', cursor: 'pointer' }}>
      {isLoading ? 'Signing in...' : 'Sign in with Farcaster'}
    </button>
  );
};

export default LoginButton; 