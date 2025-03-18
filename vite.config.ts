import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensures correct asset loading
  build: {
    outDir: "dist", // Ensures Vercel picks the correct output folder
  },
  server: {
    port: 3000, // Optional: Change dev server port if needed
    open: true, // Opens browser automatically
  },
  optimizeDeps: {
    exclude: ["lucide-react"], // Fix potential dependency issues
  },
});
