import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export interface SplashScreenProps {
  onReady?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onReady }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function checkReady() {
      setLoading(true);
      setError("");
      try {
        // @ts-ignore
        if (window.sdk && window.sdk.actions && window.sdk.actions.ready) {
          await window.sdk.actions.ready();
        } else {
          // fallback: simulate loading
          await new Promise(res => setTimeout(res, 1200));
        }
        if (!cancelled && onReady) onReady();
      } catch (e: any) {
        setError("Failed to initialize Farcaster SDK");
      } finally {
        setLoading(false);
      }
    }
    checkReady();
    return () => { cancelled = true; };
  }, [onReady]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100">
      <Card className="flex flex-col items-center p-8">
        <div className="mb-4 animate-spin rounded-full border-4 border-indigo-400 border-t-transparent h-12 w-12" />
        <h2 className="text-xl font-bold mb-2">Loading 10 Song Album Game...</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {loading && <div className="text-sm text-gray-500">Getting things ready...</div>}
        {!loading && !error && (
          <Button onClick={onReady}>Continue</Button>
        )}
      </Card>
    </div>
  );
};

export default SplashScreen; 