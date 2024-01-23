import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import VueLayouts from 'unplugin-vue-layouts';

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    VueRouter(),
    Vue(),
    AutoImport({
      imports: ['vue', VueRouterAutoImports],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      vueTemplate: true,
    }),
    Components(),
    Icons({ compiler: 'vue3' }),
    VueLayouts(),
  ],
});
