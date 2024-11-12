import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import copy from 'rollup-plugin-copy';  // Подключаем плагин для копирования

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,

      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'commonHelpers.js',
        },
      },
      outDir: '../dist',
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      copy({
        targets: [
          { src: 'src/images/*', dest: 'dist/assets' },  // Копируем изображения в папку dist/assets
          // Добавьте дополнительные файлы или папки, которые необходимо копировать
        ],
      }),
    ],
  };
});
