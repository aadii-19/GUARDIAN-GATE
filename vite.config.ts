import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Optional: Quiet some warnings for Vercel (can remove later)
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
});
