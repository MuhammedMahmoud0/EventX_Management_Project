import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: "/",
    build: {
        outDir: "dist",
        assetsDir: "assets",
        sourcemap: false,
    },

    // Only use proxy in development
    server: {
        proxy: {
            "/api": {
                target: "https://event-x-management-project-u38r-o3ug5n74d.vercel.app",
                changeOrigin: true,
                secure: true,
            },
        },
    },
});
