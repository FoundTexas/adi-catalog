import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  output: "static",
  integrations: [react()],

  server: {
    host: true,
    port: 4321,
  },

  vite: {
    server: {
      allowedHosts: [".ngrok-free.app"],
    },
  },
});