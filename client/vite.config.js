import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx', // Sử dụng JSX loader cho các file .js
        '.jsx': 'jsx', // Sử dụng JSX loader cho các file .jsx
      },
    },
  },


});
