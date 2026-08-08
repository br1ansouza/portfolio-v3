import { defineConfig } from '@rsbuild/core';
import { pluginSvelte } from '@rsbuild/plugin-svelte';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginSvelte(), pluginTailwindcss()],
  server: {
    host: '0.0.0.0',
  },
  output: {
    assetPrefix: process.env.PAGES_BASE ?? '/',
  },
  html: {
    template: './index.html',
    favicon: './public/favicon.png',
    title: 'Brian Souza — Portfolio',
    meta: {
      description:
        'Front-end and mobile developer in Florianópolis. Single page portfolio with pixel art styling and a WebGL topographic field.',
      'og:title': 'Brian Souza — Portfolio',
      'og:description':
        'Front-end and mobile developer in Florianópolis. Single page portfolio with pixel art styling and a WebGL topographic field.',
      'og:type': 'website',
    },
  },
});
