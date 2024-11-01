import { defineConfig } from 'vite';
import { sync } from 'glob'; // Импортируйте sync из glob
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
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
      outDir: '../dist', // Убедитесь, что путь указан верно
    },
    plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
  };
});