import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const UserInfo: React.FC = () => {
  const { user, signout } = useAuth();
  if (!user) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <img src={user.pfp} alt={user.username} style={{ width: 40, height: 40, borderRadius: '50%' }} />
      <span>@{user.username}</span>
      <button onClick={signout} style={{ marginLeft: 16, padding: '6px 16px', borderRadius: 6, background: '#eee', border: 'none', cursor: 'pointer' }}>Logout</button>
    </div>
  );
};

export default UserInfo; 