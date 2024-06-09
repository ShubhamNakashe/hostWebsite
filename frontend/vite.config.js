import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
    },
  },
  base: './',
});

// Copy _redirects file after build
if (process.env.NODE_ENV === 'production') {
  copyFileSync('public/_redirects', 'dist/_redirects');
}
