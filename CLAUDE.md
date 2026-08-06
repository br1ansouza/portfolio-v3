# Portfolio v3 — Contexto do projeto

Portfólio pessoal de Brian Souza, refeito do zero (terceira iteração — as duas
anteriores, `portfolio` e `portfolio-v2`, ficaram defasadas/incompletas).
Site de página única, compacto, com estética pixel art e animações GSAP + Lenis.
Conteúdo real (bio, projetos, certificados) está rascunhado em `CONTENT.md` —
validar lá antes de considerar definitivo.

## Regras de workflow (Git)

- **Fluxo de features** (mesmo padrão do TrackRide):
  1. Criar branch `feature/<nome-kebab-case>` a partir da `dev` atualizada.
  2. Commits pequenos, separados por mudança lógica dentro da feature.
  3. Ao finalizar: abrir PR pra `dev` e mergear.
  4. Quando `dev` estiver num estado estável/apresentável, abrir PR de `dev` pra `main`.
  5. Próxima feature sempre parte da `dev` pós-merge.
- **Commits**: Conventional Commits, minúsculo, imperativo, assunto ≤ 50 caracteres.
  - Tipos em inglês (padrão da taxonomia): `feat:`, `fix:`, `docs:`, `chore:`, `ci:`, `style:`, `refactor:`, `test:`.
  - **Assunto em português** — esse é o desvio deliberado em relação ao Chromix/TrackRide (que usam assunto em inglês).
  - Corpo só quando o "porquê" não for óbvio.
- **Sem assinatura de IA nos commits**: nenhum trailer `Co-Authored-By`, nenhuma nota tipo "Generated with Claude Code". Commit limpo, como se fosse escrito à mão.
- **PRs**: autonomia total pra criar e mergear.
- Remote: `https://github.com/br1ansouza/portfolio-v3.git` (privado até o site estar apresentável — decisão em `CONTENT.md`).

## Regras de produto (o que este portfolio é)

- Página única, seções ancoradas (`#hero`, `#sobre`, `#projetos`, `#certificados`, `#contato`), scroll suave via Lenis. Sem roteamento, sem múltiplas páginas.
- **Sem seção de Experiência Profissional** — decisão explícita do usuário, não reintroduzir. Formação acadêmica é diferente disso e está em aberto (ver `CONTENT.md`).
- Idioma único: PT-BR. Sem toggle de idioma (simplificação deliberada em relação às versões anteriores, que tinham PT/EN).
- Certificados: já existe uma base de 7 certificados extraídos do portfolio antigo (`src/lib/data/certificates.ts`). Novos certificados entram por último, perto do fim do projeto — não travar o resto por causa disso.
- **Princípio central: compacto.** Sem tela sobrando, sem textão animado, sem seção decorativa só pra preencher espaço. Se uma seção não agrega, corta.

## Direção visual (pixel art + GSAP + Lenis)

- Estética pixel art com toque moderno (referência "HD-2D": sprite pixelado sobre luz/partícula moderna) — não pixel puro datado tipo GeoCities.
- Tipografia pixel/bitmap só em headings e labels curtos. Corpo de texto em fonte legível normal — fonte bitmap em bloco de texto longo prejudica leitura e contraste (acessibilidade). Fonte e paleta definitivas ainda não escolhidas (ver `--font-display` e paleta em `src/lib/styles/tokens.css`, hoje placeholder).
- GSAP (core + ScrollTrigger + SplitText — tudo gratuito desde abr/2025, sem plugin pago) + Lenis pro smooth scroll. Os dois precisam rodar no mesmo loop de animação (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add` + `gsap.ticker.lagSmoothing(0)`) — já implementado em `src/lib/actions/smoothScroll.ts`.
- Regra de ouro: 2-3 momentos de animação marcantes valem mais que dez efeitos genéricos de fade-in-on-scroll repetidos em cada elemento. Direções com personalidade a explorar na fase de implementação:
  - Hero: nome reagindo ao mouse por letra (o portfolio-v2 abandonado já tinha uma versão disso — vale resgatar e dar um acabamento "stepped"/8-bit em vez de easing suave).
  - Transição entre seções no estilo "troca de fase" de jogo (combina com o fato de ele ter feito o Chromix).
  - Preview de projeto: imagem entra pixelada/baixa resolução e "revela" nítida no hover ou scroll, em vez de tilt 3D ou zoom genérico.
  - Efeito magnético sutil só nos CTAs principais — não em todo link da página.
  - Evitar: fade-up em cascata em todo elemento da tela, texto digitando letra a letra tipo terminal, partículas de fundo tipo starfield.
- Detalhe de projeto expande inline (ex: accordion/clip-path) ou linka direto pro GitHub — nunca modal/overlay flutuante.

## O que evitar explicitamente (aprendido com as versões antigas)

Os dois portfolios antigos (`br1ansouza/portfolio`, `br1ansouza/portfolio-v2`) têm
exatamente a cara "óbvio que foi feito com IA" que este projeto existe pra evitar:

- Heading com `background: linear-gradient(90deg, #ff0080, #00bfff, #ff0080)` girando infinito — estava em todo título do portfolio v1.
- Card `Paper`/`Box` com borda lateral colorida + blur + hover-lift + shadow — mesmo padrão repetido em Sobre, Certificados e Resumo.
- Modal pra ver detalhe de projeto.
- Grid de "quadradinho com ícone + sombra" — o primeiro padrão que entrega "gerado por IA" à distância.
- Contador animado tipo "9.36 média geral" em card de estatística.
- Seção de Experiência Profissional.
- Textão de bio — o parágrafo tem que caber em poucas linhas.

## Regras técnicas

- Stack: Svelte 5 (runes) + TypeScript + Rsbuild + GSAP + Lenis. Sem framework CSS (Tailwind/MUI/styled-components) — CSS puro com tokens. Sem React nem lib nenhuma do ecossistema React (as versões antigas eram React; esta é a saída deliberada).
- **TypeScript fixado em `^6.0.0`, não 7.x.** TS 7 (compilador nativo/Go) quebra `svelte-check` e `typescript-eslint` até a API programática estabilizar na 7.1 (previsão ~out/2026). Reavaliar a atualização quando isso sair.
- Gerenciador de pacotes: npm.
- Estrutura em `src/`:
  - `lib/components/` — seções da página e subcomponentes.
  - `lib/data/` — conteúdo tipado (perfil, projetos, certificados, skills).
  - `lib/types/` — interfaces compartilhadas.
  - `lib/styles/` — tokens de design + reset global.
  - `lib/actions/` — integrações que não são componente (Lenis/GSAP).
- Tipagem: nunca `any`; tipos explícitos. Arquivo que usa runes (`$state`, `$derived`, `$effect`) fora de componente precisa ser `.svelte.ts`, nunca `.ts` puro.
- Cores: nunca hex/rgb hardcoded fora de `src/lib/styles/tokens.css` — sempre `var(--color-*)`.
- **Sem comentário no meio do código.** Nome de variável/função claro substitui comentário. Nada de código comentado (código morto), nada de emoji em código.
- Limite de 150–200 linhas por arquivo; extrair lógica se passar disso.
- Ambiguidade: não assumir — perguntar antes de implementar.

## CI

- `.github/workflows/ci.yml`: lint + `svelte-check` + build em PR e push pra `dev`/`main`.
- `.github/dependabot.yml`: npm + github-actions, semanal.

## Arquivos relacionados

- `CONTENT.md` — rascunho do conteúdo real (bio, projetos, certificados, contato), com decisões em aberto pra validar antes da implementação visual.
- `CLAUDE.local.md` (gitignored, não existe até ser criado localmente) — status e notas de ambiente que não vão pro repositório.

## Status

- 2026-08-06: repositório criado. Casca do projeto (Rsbuild + Svelte 5 + TS) no ar, com seções estruturais, dados tipados extraídos do portfolio antigo e integração básica Lenis/GSAP wireada. Paleta, fonte pixel e animações de verdade ainda não implementadas — entram depois da validação deste arquivo e do `CONTENT.md`.
