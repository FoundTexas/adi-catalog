import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],

  server: {
    host: true,
    port: 4321
  },

  vite: {
    server: {
      allowedHosts: [
        ".ngrok-free.app"
      ]
    }
  }
  
});