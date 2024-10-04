import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
declare const __dirname: string; // Add this line to declare __dirname

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      // add this to cache all the imports
      workbox: {
        globPatterns: ["**/*"],
        cleanupOutdatedCaches: true,
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["**/*"],
      manifest: {
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        scope: "/",
        start_url: "/",
        short_name: "Dzikir Online",
        description: "Dzikir Pagi dan Petang",
        name: "Dzikir Online",
        icons: [
          {
            src: "/icon/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icon/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icon/maskableicon--512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
});
