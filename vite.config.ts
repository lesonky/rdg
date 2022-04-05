import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// load svg as component
import svgLoader from 'vite-svg-loader';

// for arco import
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rdg/dist/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    svgLoader(),
    Components({
      resolvers: [ArcoResolver()],
    }),
  ],
});
