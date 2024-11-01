import { defineConfig } from 'vite';
import { sync } from 'glob'; // Импортируем функцию sync из glob
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src', // Указание корневой папки проекта
    build: {
      sourcemap: true,
      rollupOptions: {
        input: sync('./src/*.html', { absolute: true }), // Получаем все HTML файлы в папке src с абсолютными путями
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'; // Создание чанка для node_modules
            }
          },
          entryFileNames: 'commonHelpers.js', // Имя выходного файла
        },
      },
      outDir: '../dist', // Папка для выходных файлов
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']) // Обновление при изменении HTML
    ],
  };
});
