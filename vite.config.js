import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: '.', // Указываем корневую папку проекта
    build: {
      sourcemap: true,
      rollupOptions: {
        input: './index.html', // Указываем на ваш единственный HTML файл
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'; // Создаем чанк для зависимостей из node_modules
            }
          },
          entryFileNames: 'commonHelpers.js', // Указываем имя выходного файла
        },
      },
      outDir: 'dist', // Выходная папка для сборки
    },
    plugins: [injectHTML(), FullReload(['./*.html'])], // Указываем на HTML файл в корне
  };
});