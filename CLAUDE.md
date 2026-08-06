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
  3. Ao finalizar: abrir PR pra `dev` e mergear. Autonomia total nessa etapa.
  4. Próxima feature sempre parte da `dev` pós-merge.
- **PR de `dev` pra `main` é sempre do usuário** — Claude nunca abre nem mergeia esse PR. Tudo fica acumulando em `dev` (uma ou mais features) até o usuário decidir promover pra `main`.
- **Commits**: Conventional Commits, minúsculo, imperativo, assunto ≤ 50 caracteres.
  - Tipos em inglês (padrão da taxonomia): `feat:`, `fix:`, `docs:`, `chore:`, `ci:`, `style:`, `refactor:`, `test:`.
  - **Assunto em português** — esse é o desvio deliberado em relação ao Chromix/TrackRide (que usam assunto em inglês).
  - Corpo só quando o "porquê" não for óbvio.
- **Sem assinatura de IA nos commits**: nenhum trailer `Co-Authored-By`, nenhuma nota tipo "Generated with Claude Code". Commit limpo, como se fosse escrito à mão.
- Remote: `https://github.com/br1ansouza/portfolio-v3.git` (privado até o site estar apresentável — decisão em `CONTENT.md`).

## Regras de produto (o que este portfolio é)

- Página única, seções ancoradas (`#hero`, `#sobre`, `#projetos`, `#certificados`, `#contato`), scroll suave via Lenis. Sem roteamento, sem múltiplas páginas.
- **Sem navbar, sem sidebar, sem footer, sem cabeçalho fixo.** Nenhuma barra persistente por cima do conteúdo — isso é o que dá cara de "cardápio de restaurante". Navegação é só scroll. Se algum dia precisar de indicador de posição, tem que ser discreto (ex: um marcador mínimo), nunca uma barra de navegação tradicional.
- **Sem seção de Experiência Profissional** — decisão explícita do usuário, não reintroduzir. Formação acadêmica é diferente disso e está em aberto (ver `CONTENT.md`).
- Idioma único: PT-BR. Sem toggle de idioma (simplificação deliberada em relação às versões anteriores, que tinham PT/EN).
- Certificados: já existe uma base de 7 certificados extraídos do portfolio antigo (`src/lib/data/certificates.ts`). Novos certificados entram por último, perto do fim do projeto — não travar o resto por causa disso.
- **Princípio central: compacto.** Sem tela sobrando, sem textão animado, sem seção decorativa só pra preencher espaço. Se uma seção não agrega, corta.

## Direção visual (pixel art + GSAP + Lenis)

- Estética pixel art com toque moderno (referência "HD-2D": sprite pixelado sobre luz/partícula moderna) — não pixel puro datado tipo GeoCities.
- Tipografia pixel/bitmap só em headings e labels curtos. Corpo de texto em fonte legível normal — fonte bitmap em bloco de texto longo prejudica leitura e contraste (acessibilidade). Fonte pixel definitiva ainda não escolhida (`--font-display` aponta pra `--font-body` até lá) — candidatas: Press Start 2P, Silkscreen, Pixelify Sans.
- GSAP (core + ScrollTrigger + SplitText — tudo gratuito desde abr/2025, sem plugin pago) + Lenis pro smooth scroll. Os dois precisam rodar no mesmo loop de animação (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add` + `gsap.ticker.lagSmoothing(0)`) — já implementado em `src/lib/actions/smoothScroll.ts`.
- Regra de ouro: 2-3 momentos de animação marcantes valem mais que dez efeitos genéricos de fade-in-on-scroll repetidos em cada elemento. Direções com personalidade a explorar na fase de implementação:
  - Hero: nome reagindo ao mouse por letra (o portfolio-v2 abandonado já tinha uma versão disso — vale resgatar e dar um acabamento "stepped"/8-bit em vez de easing suave).
  - Transição entre seções no estilo "troca de fase" de jogo (combina com o fato de ele ter feito o Chromix).
  - Preview de projeto: imagem entra pixelada/baixa resolução e "revela" nítida no hover ou scroll, em vez de tilt 3D ou zoom genérico.
  - Efeito magnético sutil só nos CTAs principais — não em todo link da página.
  - Evitar: fade-up em cascata em todo elemento da tela, texto digitando letra a letra tipo terminal, partículas de fundo tipo starfield.
- Detalhe de projeto expande inline (ex: accordion/clip-path) ou linka direto pro GitHub — nunca modal/overlay flutuante.

## Sistema de cores

Cor vive em duas camadas em `src/lib/styles/tokens.css` — nunca hex/rgb solto em componente:

1. **Primitivas** (`--palette-*`): a escala crua, ex. `--palette-ink-950`, `--palette-accent-500`. É a única coisa que muda pra reskinar o site inteiro.
2. **Semânticas** (`--color-*`): o que o componente de fato usa, ex. `--color-bg`, `--color-text-muted`, `--color-accent-hover`. Cada uma aponta pra uma primitiva.

Componente sempre usa `var(--color-*)`, nunca `var(--palette-*)` direto — isso preserva a indireção (trocar a paleta = editar as ~8 linhas de primitivas, nada mais).

Paleta atual (placeholder intencional, mas já é uma escolha real, não um rascunho aleatório): base quase-preta (`--palette-ink-950` a `-100`) + um verde vivo único de acento (`--palette-accent-300/500/700`, tipo terminal/matrix) — alto contraste, uma cor só de destaque, sem paleta multi-neon (ficaria "gritado" demais pro "elegante e moderno" pedido). Dark-only, sem toggle de tema — mesmo padrão do Chromix (`dark theme fixo`) e do TrackRide (mapa em dark tile). Trocar antes de dar como definitivo é só editar as primitivas.

## Ícones

- Lib escolhida: [`pixelarticons`](https://github.com/halfmage/pixelarticons) (MIT, ~900 ícones pixel art). Não instalado como dependência — só os `path` SVG usados foram extraídos manualmente pra `src/lib/data/icons.ts` (projeto é pequeno demais pra justificar o pacote inteiro, que também não tem build pra Svelte, só React/Vue/webfont).
- **Ícone de marca (GitHub/LinkedIn/Discord) não usa o logo oficial** — usa um ícone genérico pixel art (`terminal`, `briefcase`, `message`) com o label ao lado identificando a plataforma. Dois motivos: (1) o logo oficial tem curva suave, quebraria a linguagem 100% pixel/blocada do resto do site; (2) `linkedin.svg` nem existe mais no principal banco de logos open source (`simple-icons`) por pedido de takedown — mais simples nem depender disso.
- Créditos do pacote em `README.md`.

## UI: por que não Skeleton (nem outra lib de componente)

Cogitado usar [Skeleton](https://skeleton.dev/) (like no TrackRide) como base. Decisão: **não**, pelo menos não nessa fase.

- Skeleton v5 exige Tailwind CSS 4 como peer dependency — contradiz a regra de "sem framework CSS" já adotada aqui pra fugir da cara genérica das versões antigas.
- O sistema de token semântico do Skeleton (escala numérica por paleta) é bom — é exatamente o padrão que a seção "Sistema de cores" acima replica à mão, sem trazer Tailwind nem os componentes prontos (que têm cara própria de "SaaS moderno", difícil de descaracterizar pro visual pixel art/cantos retos que este projeto quer).
- Se algum dia fizer sentido revisitar (ex: se o projeto crescer muito e a manutenção de CSS à mão virar fardo), é uma decisão nova — não assumir.

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
  - `lib/data/` — conteúdo tipado (perfil, projetos, certificados, skills, ícones).
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

- 2026-08-06: repositório criado. Casca do projeto (Rsbuild + Svelte 5 + TS) no ar, com seções estruturais, dados tipados extraídos do portfolio antigo e integração básica Lenis/GSAP wireada. Removido navbar/footer fixo (só scroll). Sistema de cores (primitiva/semântica) e ícones (pixelarticons, extraído à mão) implementados. Fonte pixel definitiva, animações de verdade e curadoria final do `CONTENT.md` ainda pendentes.
