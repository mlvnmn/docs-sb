import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    fs: {
      strict: false,
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        faculty: resolve(__dirname, 'faculty/index.html'),
      },
    },
  },
});
