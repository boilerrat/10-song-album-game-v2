import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

interface User {
  fid: number;
  username?: string;
  pfp?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signin: () => Promise<void>;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Replace with your backend endpoint or a mock for now
  const BACKEND_ORIGIN = ""; // e.g., "https://your-backend.com"

  // Mock user for local development
  const MOCK_USER: User = {
    fid: 123456,
    username: "demo_user",
    pfp: "https://placehold.co/40x40?text=U",
  };

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        if (!BACKEND_ORIGIN) {
          // Local dev: mock user
          setUser(MOCK_USER);
        } else {
          // Try to get user info if already signed in
          const res = await sdk.quickAuth.fetch(`${BACKEND_ORIGIN}/me`);
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          } else {
            setUser(null);
          }
        }
      } catch (e) {
        setUser(null);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const signin = async () => {
    setIsLoading(true);
    try {
      if (!BACKEND_ORIGIN) {
        // Local dev: mock user
        setUser(MOCK_USER);
      } else {
        // Trigger Quick Auth fetch to get a session
        const res = await sdk.quickAuth.fetch(`${BACKEND_ORIGIN}/me`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signout = () => {
    setUser(null);
    // Optionally clear session storage if implemented
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}; 