import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@features": path.resolve(__dirname, "src/features"),
      "@auth": path.resolve(__dirname, "src/features/auth"),
      "@events": path.resolve(__dirname, "src/features/events"),
      "@users": path.resolve(__dirname, "src/features/users"),
      "@booking": path.resolve(__dirname, "src/features/booking"),
      "@stores": path.resolve(__dirname, "src/features"), 
      "@services": path.resolve(__dirname, "src/features"), 
    },
  },
});
