<div align="center">

# Brian Souza — Portfolio

**Portfólio pessoal em página única, com estética pixel art e um campo topográfico renderizado em WebGL.**

[**br1ansouza.github.io/portfolio-v3 →**](https://br1ansouza.github.io/portfolio-v3/)

[![Svelte](https://img.shields.io/badge/Svelte%205-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Rsbuild](https://img.shields.io/badge/Rsbuild-FF5C00?logo=rspack&logoColor=white)](https://rsbuild.rs)
[![Tailwind](https://img.shields.io/badge/Tailwind%204-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=black)](https://gsap.com)

</div>

Terceira tentativa de portfólio. As duas anteriores morreram do mesmo jeito: informação demais e um visual que qualquer um identifica como template. Esta parte de três regras rígidas:

- **Compacto.** Se não agrega, corta.
- **Sem barra nenhuma.** Nem navbar, nem sidebar, nem rodapé. Navegação é só scroll.
- **Nada de canto arredondado com sombra.** Canto reto em tudo.

Svelte 5 (runes), Rsbuild, Tailwind 4 + Skeleton 5, GSAP + Lenis, TypeScript 6. Bilíngue EN/PT, tema claro e escuro.

O fundo do hero é um fragment shader em WebGL2 puro: ruído fbm, curvas de nível e dithering Bayer 4x4 na GPU, com uma esfera que deforma perto do cursor e troca o tema ao ser clicada. São ~6 KB de GLSL. Three.js custaria 130 KB gzip, mais que todo o JS do site.

Atribuições de terceiros em [`THIRD-PARTY.md`](./THIRD-PARTY.md).
