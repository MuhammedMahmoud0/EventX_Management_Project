import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: "/",
    headers: [
        {
            source: "/api/(.*)",

            headers: [
                {
                    key: "Access-Control-Allow-Origin",
                    value: "https://app.example",
                },

                {
                    key: "Access-Control-Allow-Methods",
                    value: "GET, POST, OPTIONS",
                },

                {
                    key: "Access-Control-Allow-Headers",
                    value: "Content-Type, Authorization",
                },

                { key: "Access-Control-Allow-Credentials", value: "true" },
            ],
        },
    ],
});
