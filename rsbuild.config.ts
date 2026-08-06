import { defineConfig } from '@rsbuild/core';
import { pluginSvelte } from '@rsbuild/plugin-svelte';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginSvelte()],
  html: {
    title: 'Brian Souza — Portfolio',
    meta: {
      description: 'Portfólio pessoal de Brian Souza, desenvolvedor front-end.',
    },
  },
});
