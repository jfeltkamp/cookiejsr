import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { sass } from 'svelte-preprocess-sass';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    preprocess: {
      style: sass(),
    }
  })],
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    sourcemap: false,
    rollupOptions: {
      input: {
        index: 'src/main.js',
        'cookiesjsr-preloader': 'src/preloader.js'
      },
      output: {
        manualChunks: false,
        inlineDynamicImports: false,
        entryFileNames: '[name].js',   // currently does not work for the legacy bundle
        assetFileNames: '[name].[ext]', // currently does not work for images
      },
    }
  }
})
