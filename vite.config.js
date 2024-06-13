import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react()],
    server: {
      port: isDev ? 3000 : 3002,
      proxy: {
        '/socket.io': {
          target: 'ws://localhost:3001',
          ws: true
        }
      },
      hmr: {
        port: 3000 
      }
    }
  };
});
