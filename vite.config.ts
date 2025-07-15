import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: ["@farcaster/miniapp-wagmi-connector"],
    },
  },
  optimizeDeps: {
    exclude: ["@farcaster/miniapp-wagmi-connector"],
  },
  ssr: {
    external: ["@farcaster/miniapp-wagmi-connector"],
  },
});
