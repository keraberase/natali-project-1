import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    base: '/natali-project-1/',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/**/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('swiper')) {
                return 'swiper';  // Отдельный чанк для swiper
              }
              return 'vendor'; // Остальные библиотеки в чанк vendor
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';  // Копирование изображений в assets
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
      assetsDir: 'assets', // Папка для изображений
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
