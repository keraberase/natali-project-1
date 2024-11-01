import { defineConfig } from 'vite';
import { sync } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src', // Указываем корневую папку с исходным кодом
    build: {
      sourcemap: true,
      rollupOptions: {
        input: sync('./src/*.html'), // Убедитесь, что пути правильные
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'commonHelpers.js',
        },
      },
      outDir: '../dist', // Указываем выходную папку для сборки
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html'])
    ],
  };
});
