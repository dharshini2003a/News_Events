// vite.config.js — Vite build configuration
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,       // dev server runs at localhost:3000
    open: true,        // auto-opens browser on npm run dev
  },
  build: {
    outDir: "dist",   // production build goes into /dist folder
  },
});
