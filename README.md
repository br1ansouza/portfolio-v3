<div align="center">

# Brian Souza — Portfolio

**Portfólio pessoal em página única, com estética pixel art e um campo topográfico renderizado em WebGL.**

[![Svelte](https://img.shields.io/badge/Svelte%205-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Rsbuild](https://img.shields.io/badge/Rsbuild-FF5C00?logo=rspack&logoColor=white)](https://rsbuild.rs)
[![Tailwind](https://img.shields.io/badge/Tailwind%204-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=black)](https://gsap.com)

</div>

🚧 Em desenvolvimento, sem deploy ainda.

## A ideia

Terceira tentativa de portfólio. As duas anteriores morreram do mesmo jeito: informação demais, mudança de rumo no meio e um visual que qualquer um identifica como template. Esta parte de três regras rígidas:

- **Compacto.** Sem tela sobrando, sem seção decorativa, sem textão. Se não agrega, corta.
- **Sem barra nenhuma.** Nem navbar, nem sidebar, nem rodapé, nem cabeçalho fixo. Navegação é só scroll.
- **Nada de canto arredondado com sombra.** Canto reto em tudo. É a decisão visual que mais separa isto de um template.

## Stack

| Camada    | Escolha                 | Por quê                                                                          |
| --------- | ----------------------- | -------------------------------------------------------------------------------- |
| Framework | Svelte 5 (runes)        | Bundle pequeno e reatividade direta, sem o ecossistema React das versões antigas |
| Build     | Rsbuild 2 (Rspack)      | Build rápido, configuração mínima                                                |
| CSS       | Tailwind 4 + Skeleton 5 | Projeto de poucos dias: partir de uma base pronta valeu mais que CSS artesanal   |
| Animação  | GSAP + Lenis            | ScrollTrigger e scroll suave no mesmo loop de animação                           |
| Tipos     | TypeScript 6            | Fixado em 6.x de propósito, ver nota abaixo                                      |

> **TypeScript preso na 6.x.** A 7 (compilador nativo em Go) quebra `svelte-check` e `typescript-eslint` até a API programática estabilizar na 7.1. O Dependabot ignora bumps de `typescript >= 7`.

## As animações

Quatro efeitos, todos na mesma linguagem: um display CRT resolvendo uma imagem. Coerência é o que faz parecer intencional em vez de "efeito que achei legal na internet".

**Campo topográfico em WebGL** (`DitherField.svelte` + `actions/ditherShader.ts`). Fragment shader que gera ruído fbm, extrai curvas de nível e quantiza com dithering Bayer 4x4 direto na GPU, em blocos de 3px. As curvas se deformam e acendem em volta do cursor. WebGL2 puro, sem Three.js, cerca de 6 KB. Descartei `react-three-fiber` de propósito: Three.js pesa ~600 KB e portfólio com blob 3D flutuante é justamente o clichê que este projeto evita.

**Dissolve por dithering** (`actions/pixelReveal.ts`). A lista de projetos aparece coberta por uma grade de blocos que somem em ordem de dithering Bayer, não aleatória. O conteúdo materializa como imagem carregando em modem discado.

**Letras fugindo do cursor** (`actions/letterPush.ts`). O nome no hero é quebrado em `<span>` por letra. Easing em `steps(4)`, nunca suave: o passo travado é o que faz parecer 8-bit em vez de física genérica.

**Scanlines por velocidade de scroll** (`Scanlines.svelte`). Linhas de varredura que só aparecem enquanto se rola rápido, proporcionais à velocidade do Lenis. Em repouso, invisíveis.

Tudo respeita `prefers-reduced-motion`.

## Temas

Dois temas Skeleton customizados em `src/lib/styles/theme.css`, alternados por um botão de lâmpada no canto superior direito. A transição entre eles usa o mesmo dithering Bayer do resto do site.

- **`pixel`** (escuro): base quase preta, acento verde terminal.
- **`pixel-light`** (claro): cinza-azulado frio, acento laranja queimado. O verde não sobrevive a fundo claro, então a paleta troca de acento junto com o tema.

A escala do Skeleton é **invertida no tema claro**: `surface-950` continua sendo o fundo e `surface-50` continua sendo o texto, só que com os valores trocados. Isso mantém todos os componentes funcionando sem nenhuma alteração de classe.

## Estrutura

```
src/
├── App.svelte
├── index.ts / index.css
└── lib/
    ├── actions/     # Svelte actions e integrações (GSAP, Lenis, shader, Bayer)
    ├── components/  # Seções da página e subcomponentes
    ├── data/        # Conteúdo tipado (perfil, projetos, certificados, skills, ícones)
    ├── fonts/       # Silkscreen self-hospedada
    ├── stores/      # Estado com runes (.svelte.ts)
    ├── styles/      # Tokens, tema e reset
    ├── types/       # Interfaces compartilhadas
    ├── images/
    └── videos/      # Previews WebM dos projetos
```

## Rodando

```bash
npm install
npm run dev
```

Disponível em [http://localhost:3000](http://localhost:3000).

```bash
npm run build         # build de produção
npm run preview       # preview do build
npm run check         # svelte-check
npm run lint          # eslint
npm run format        # prettier --write
```

> No WSL2 o dev server precisa escutar em `0.0.0.0` para o navegador do Windows alcançar. Já está em `rsbuild.config.ts`; preso em `localhost` o Windows recebe `ERR_CONNECTION_RESET`.

## Detalhes que custaram caro

Coisas que só apareceram testando no navegador, não no compilador:

- **Fonte pixel precisa de tamanho múltiplo de 8px.** A Silkscreen é desenhada num grid de 8px; em `text-xs` (12px) os glifos borram e aparecem artefatos que parecem acentos errados. `.font-display` também precisa de `-webkit-font-smoothing: none`.
- **`step(0.0, 0.0)` retorna 1 em GLSL.** A matriz Bayer tem uma entrada zero, então 1 de cada 16 blocos ficava aceso mesmo com intensidade zero, formando uma grade de pontos que nunca sumia. Os limiares agora ficam em (0,1), nunca em 0.
- **O carrossel de certificados precisa de `data-lenis-prevent`.** Sem isso o Lenis captura a roda no nível do documento e o carrossel congela quando o cursor sai da faixa.
- **O período do loop infinito é o `offsetLeft` do primeiro item da segunda cópia, nunca `scrollWidth / 2`.** Com 22 cartões existem 21 espaçamentos, mas um ciclo tem 11 cartões e 11 espaçamentos: a divisão erra por meio espaçamento e o erro acumula a cada volta.
- **`:hover` do CSS não serve para elemento que se move sob o cursor.** O navegador só reavalia `:hover` quando o _ponteiro_ se move. No carrossel a detecção é manual, via `elementFromPoint`.

## Contexto e regras

[`CLAUDE.md`](./CLAUDE.md) tem arquitetura, decisões de design e o que evitar. [`CONTENT.md`](./CONTENT.md) tem o rascunho de conteúdo e as decisões em aberto.

## Créditos

Ícones baseados em [pixelarticons](https://github.com/halfmage/pixelarticons) (MIT), de Gerrit Halfmann.
Fonte [Silkscreen](https://fonts.google.com/specimen/Silkscreen) (OFL), de Jason Kottke.
