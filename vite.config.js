import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';
import viteStaticCopy from 'vite-plugin-static-copy';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    base: command === 'build' ? './' : '/',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/**/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => (chunkInfo.name === 'commonHelpers' ? 'commonHelpers.js' : '[name].js'),
          assetFileNames: assetInfo =>
            assetInfo.name && assetInfo.name.endsWith('.html') ? '[name].[ext]' : 'assets/[name]-[hash][extname]',
        },
      },
      outDir: './dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/*.html']),
      SortCss({
        sort: 'mobile-first',
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'src/images/*',
            dest: 'assets'
          }
        ]
      })
    ],
  };
});
