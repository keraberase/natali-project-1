import { defineConfig } from 'vite';
import * as glob from 'glob'; // Исправленный импорт
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: '.', // Указание корневой папки проекта
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./*.html'), // Указываем, что HTML файлы находятся в корне
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'commonHelpers.js',
        },
      },
      outDir: './dist', // Папка для выходных файлов
    },
    plugins: [injectHTML(), FullReload(['./**/*.html'])],
  };
});
