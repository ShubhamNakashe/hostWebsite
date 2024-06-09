import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePluginStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    VitePluginStaticCopy({
      targets: [
        {
          src: 'public/_redirects',
          dest: ''
        }
      ]
    })
  ],
  build: {
    outDir: 'dist',
  },
  base: './',
});
