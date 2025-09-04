// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: "/", // always serve static assets from root
    build: {
        outDir: "dist",
        assetsDir: "assets",
        sourcemap: false,
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:5000", // dev only
                changeOrigin: true,
            },
        },
    },
});
