import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    base:
        process.env.VITE_API_KEY ||
        "https://event-x-management-project-u38r-o3ug5n74d.vercel.app/api",
});
