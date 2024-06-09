import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.', // Set the root to the current directory where index.html is located
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      input: 'index.html', // Adjust the path if necessary
    },
  },
  server: {
    historyApiFallback: true, // For SPA routing
  },
});
