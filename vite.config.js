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
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/**/*.html'), // Рекурсивный поиск всех HTML
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'; // Все модули из node_modules в отдельный чанк
            }
            // Выделите другие чанк файлы при необходимости
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]'; // HTML-файлы
            }
            return 'assets/[name]-[hash][extname]'; // Другие ресурсы
          },
        },
      },
      outDir: '../dist', // Путь для выходных файлов
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
      SortCss({
        sort: 'mobile-first', // Сортировка медиа-запросов
      }),
    ],
  };
});
