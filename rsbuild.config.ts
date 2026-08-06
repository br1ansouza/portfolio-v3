import { defineConfig } from '@rsbuild/core';
import { pluginSvelte } from '@rsbuild/plugin-svelte';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginSvelte(), pluginTailwindcss()],
  html: {
    template: './index.html',
    title: 'Brian Souza — Portfolio',
    meta: {
      description: 'Portfólio pessoal de Brian Souza, desenvolvedor front-end.',
    },
  },
});
