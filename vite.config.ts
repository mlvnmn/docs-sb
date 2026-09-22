import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // The stylesheet already relies on container query units, so the floor is
    // effectively Chrome 106 / Safari 16 / Firefox 110 - no point shipping
    // transpiled output for engines that can't render the design anyway.
    target: 'es2022',
    // Every image lives in public/ and is referenced by URL, so nothing should
    // be inlined as a data URI; keeping assets as files means they stay
    // cacheable and don't bloat the JS that references them.
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        /**
         * Dependencies change far less often than the site's own code, so they
         * go in their own long-lived chunks - an edit to a component no longer
         * invalidates the cached copy of React or GSAP, and the chunks download
         * in parallel. Matching on the resolved path rather than naming the
         * packages is what catches deep entry points like `react-dom/client`,
         * which a package-name mapping leaves behind in the app chunk.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/[\\/]node_modules[\\/](gsap|lenis)[\\/]/.test(id)) return 'vendor-motion';
          // Everything else here is React, React DOM, the router and their
          // shared deps, which always load together - so, one chunk.
          return 'vendor-react';
        },
      },
    },
  },
});
