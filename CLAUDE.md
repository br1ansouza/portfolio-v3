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
- Bilíngue EN/PT com **inglês como padrão** (ver a seção "Idioma" abaixo). Reverte a decisão anterior de idioma único PT-BR.
- Certificados: já existe uma base de 7 certificados extraídos do portfolio antigo (`src/lib/data/certificates.ts`). Novos certificados entram por último, perto do fim do projeto — não travar o resto por causa disso.
- **Princípio central: compacto.** Sem tela sobrando, sem textão animado, sem seção decorativa só pra preencher espaço. Se uma seção não agrega, corta.

## Direção visual (pixel art + GSAP + Lenis)

- Estética pixel art com toque moderno (referência "HD-2D": sprite pixelado sobre luz/partícula moderna) — não pixel puro datado tipo GeoCities.
- Tipografia pixel só em heading e label curto — ver seção "Tipografia" abaixo.
- GSAP (core + ScrollTrigger + SplitText — tudo gratuito desde abr/2025, sem plugin pago) + Lenis pro smooth scroll. Os dois precisam rodar no mesmo loop de animação (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add` + `gsap.ticker.lagSmoothing(0)`) — já implementado em `src/lib/actions/smoothScroll.ts`.
- Regra de ouro: 2-3 momentos de animação marcantes valem mais que dez efeitos genéricos de fade-in-on-scroll repetidos em cada elemento. Direções com personalidade a explorar na fase de implementação:
  - Hero: nome reagindo ao mouse por letra (o portfolio-v2 abandonado já tinha uma versão disso — vale resgatar e dar um acabamento "stepped"/8-bit em vez de easing suave).
  - Transição entre seções no estilo "troca de fase" de jogo (combina com o fato de ele ter feito o Chromix).
  - Transição de seção estilo "troca de fase" de jogo — ainda não implementada, candidata a próxima feature.
  - Efeito magnético sutil só nos CTAs principais — não em todo link da página.
  - Evitar: fade-up em cascata em todo elemento da tela, texto digitando letra a letra tipo terminal, partículas de fundo tipo starfield.
- Detalhe de projeto expande inline (ex: accordion/clip-path) ou linka direto pro GitHub — nunca modal/overlay flutuante.

## Sistema de cores

Tema Skeleton customizado `pixel`, em `src/lib/styles/theme.css`, aplicado via `data-theme="pixel"` no `index.html`. Uma camada só: as escalas 50→950 do Skeleton (`--color-primary-*`, `--color-surface-*`, etc.) são a fonte única. Trocar a cara do site inteiro = editar esse arquivo, nada mais.

- Componente usa classe Tailwind (`bg-primary-500`, `text-surface-300`), nunca hex solto nem `bg-[#...]`.
- `--color-surface-*`: escala quase-preta levemente fria (`#0a0a0f` a `#eceef2`).
- `--color-primary-*`: verde terminal (`#2fe08a` no 500). É a única cor de destaque usada — secondary (âmbar) e tertiary (magenta) existem porque o Skeleton exige a escala completa, mas não são usados na UI. Uma cor só de acento é o que mantém "elegante" em vez de "arcade gritado".
- **`--radius-base` e `--radius-container` são `0`.** Canto reto é a decisão visual mais importante do projeto — canto arredondado + sombra é exatamente a assinatura "template de IA" que este portfolio existe pra evitar. Não reintroduzir.
- Havia decisão de dark-only; foi revertida pelo usuário. Ver a seção "Temas" abaixo.

## Tipografia

- Display: **Silkscreen** (OFL), self-hospedada em `src/lib/fonts/*.woff2` — importada por caminho relativo em `tokens.css` pro Rspack empacotar com hash. Não usar CDN de fonte.
- **Tamanho de fonte pixel tem que ser múltiplo de 8px** (`text-[8px]`, `text-[16px]`). Silkscreen é desenhada num grid de 8px; em tamanho quebrado (ex. `text-xs` = 12px) os glifos borram e aparecem artefatos que parecem acentos errados. Isso foi diagnosticado por screenshot, não é teoria.
- `.font-display` tem `-webkit-font-smoothing: none` em `global.css` — sem isso o antialiasing arredonda a borda do pixel e mata o efeito.
- Corpo de texto em sans-serif do sistema, tamanho livre. Fonte pixel só em heading, label e número.

## Scrollbar oculta

A barra de rolagem nativa está escondida em `global.css` (`scrollbar-width: none` + `::-webkit-scrollbar`), a pedido do usuário. O scroll continua funcionando por roda, toque, teclado (setas, PageUp/Down, Home/End) e pelo Lenis. O que se perde é arrastar a barra com o mouse e a noção visual de progresso na página. Se um dia isso incomodar, a saída é um indicador discreto de progresso, nunca trazer a barra padrão de volta.

## Idioma (EN/PT)

Site bilíngue com **inglês como padrão para todo mundo**, sem detecção de navegador. Botão logo abaixo do de tema alterna para português. Estado em `stores/language.svelte.ts`, persistido em `localStorage`, e o `lang` do `<html>` acompanha.

- Todo texto de conteúdo é `Localized = Record<Language, string>` dentro dos próprios arquivos de `lib/data/`. Não existe arquivo de tradução separado: a versão EN e a PT ficam lado a lado no mesmo objeto, então acrescentar um projeto ou certificado obriga a escrever as duas.
- Strings de interface (títulos de seção, "COPIAR", "Mais em") ficam em `lib/data/ui.ts`.
- Componente lê com o helper `t()` de `stores/language.svelte`. Como `language.current` é `$state`, o template reavalia sozinho na troca.
- **O botão mostra o idioma de destino, não o atual** (mesma lógica do botão de tema, que mostra a lâmpada do tema que vai entrar).
- **Bandeira foi tentada e descartada.** Em 24x24 com blocos de 2px não há resolução pra diferenciar a bandeira do Brasil da dos EUA: as duas viram um retângulo com um risco. O botão usa o código de duas letras em Silkscreen 16px, que é legível e já é a linguagem do site.
- A troca usa o mesmo `ditherWipe` do tema (extraído pra `actions/ditherWipe.ts` justamente pra os dois botões compartilharem).
- As regras de escrita valem igual em inglês: sem travessão no meio de frase, fato concreto no lugar de adjetivo, bio não cita projeto pelo nome.

## Temas (claro e escuro)

Dois temas Skeleton em `src/lib/styles/theme.css`. **A troca é pela esfera do hero**; o botão de lâmpada só aparece quando a esfera não existe (largura abaixo de 760px, `prefers-reduced-motion`, sem WebGL2), senão quem está fora desses casos fica sem nenhuma forma de trocar o tema. Quem manda nisso é o `sphereAvailable` no `App.svelte`, alimentado pelo callback do `Hero`. Por isso `theme.init()` e `language.init()` moraram pro corpo do script do `App.svelte`: não podem depender de um componente que às vezes não monta. Estado em `stores/theme.svelte.ts`, persistido em `localStorage`, com `prefers-color-scheme` como padrão inicial.

- **`pixel`** (escuro): base `#0a0a0f`, acento verde `#2fe08a`. É o padrão e **não deve ser alterado ao mexer no claro**.
- **`pixel-light`** (claro): base `#eceef2`, acento laranja `#9a3b06`. O verde não sobrevive a fundo claro; a paleta troca de acento junto com o tema.
- **A primeira versão do claro usava base `#bcc4cf` e acento `#803505` e foi rejeitada por ilegibilidade.** O problema principal era o fundo, não o acento: só trocando o cinza-azulado por um cinza claro de verdade, o mesmo laranja sobe de 4,91 pra 7,44 de contraste. Hoje todos os pares que a UI realmente usa passam de 4,5 (o pior é a assinatura em `surface-600`, com 4,73).
- **Texto pixel em fundo claro precisa engrossar, mas nunca via `font-weight`.** O traço fino que "estoura" e fica legível em claro sobre escuro some em escuro sobre claro, principalmente nos labels de 8px. É compensação óptica, não acessibilidade: o contraste já passava.
  - **Tentativa rejeitada: `font-weight: 700`.** Funcionava aqui, mas na máquina do usuário (Brave, Windows) a Silkscreen 700 não entrava e o `<h1>` do hero caía pro `Courier New` do fallback. O tema claro ficava com o nome em serifa enquanto o escuro continuava pixel. Nunca reproduzi a falha de carregamento, e não importa: pedir um segundo arquivo de fonte cria essa classe de bug inteira.
  - **Solução: token `--display-emboss`** (`none` no escuro, `1px 0 0 currentColor` no claro), aplicado como `text-shadow` em `.font-display` no `global.css` e repetido nos poucos blocos `<style>` que usam `var(--font-display)` direto (`Certificates`, `Contact`, `LanguageToggle`). O deslocamento é de 1px inteiro, então não borra o pixel. Em 8px dobra a espessura do traço; em 88px é invisível, e o hero fica idêntico nos dois temas. Só a Silkscreen 400 é baixada.
- **A escala é invertida no tema claro**: `surface-950` continua sendo o fundo e `surface-50` o texto, só que com os valores trocados. Todos os componentes seguem funcionando sem trocar uma classe sequer.
- A transição usa o mesmo dithering Bayer do `pixelReveal`: blocos entram cobrindo a tela, o tema troca no meio, os blocos saem.
- O shader tem tokens próprios, **não reaproveita `--color-surface-*`**: `--dither-ink` e `--dither-strength` (1 no escuro, 1.55 no claro). Foi assim que consegui reforçar o claro sem mexer no escuro; antes qualquer ajuste afetava os dois.
- **O shader lê cor uma única vez no mount.** `DitherField` expõe um `applyTheme()` que um `$effect` chama quando o tema muda. Sem isso o campo fica com a cor do tema anterior.

## Erros que eu cometi aqui e não devo repetir

- **Mexer no que não foi pedido.** Ao "suavizar o degradê" eu também elevei a máscara ao quadrado e escureci o alpha, o que apagou o hero no tema escuro. O usuário percebeu na hora. Pedido de ajuste é para ser cirúrgico.
- **Alterar tom sob pretexto de acessibilidade sem perguntar.** Escureci três cinzas do tema escuro (instituição do certificado, assinatura, "Mais em") para passar no WCAG. Foi rejeitado e revertido. O certo é medir, relatar o número e deixar a decisão com ele.
- **Medir do lado errado.** Afirmei que o dev server estava no ar porque o `curl` respondia dentro do WSL, enquanto o navegador do Windows recebia `ERR_CONNECTION_RESET`. Precisa de `server.host: '0.0.0.0'` e teste com `curl.exe` do Windows.
- **Testar com estado sujo.** Medi contraste do "tema claro" com o `localStorage` já em `pixel-light`, então meu clique levava para o escuro e eu media o tema errado. Forçar o estado (`addInitScript`) antes de medir.

## Mobile

Testado em 360, 390 e 430px de largura, nos dois temas, com `isMobile` e `hasTouch`. Sem overflow horizontal, sem erro de console.

- **Abaixo de 640px os controles de canto viram `position: absolute` em vez de `fixed`.** Fixos, os dois botões ficavam por cima do corpo do texto e comiam palavras inteiras em qualquer seção; a tela é estreita demais pra existir margem livre. Absolutos, eles moram no topo da página e somem ao rolar. Trocar tema ou idioma exige voltar ao topo, o que é aceitável numa página só, e casa melhor com a regra de não ter nada persistente por cima do conteúdo.
- O fundo dos botões é opaco (`--color-surface-950`), não mais `color-mix` com transparência: com 80% o texto passava por baixo e virava sujeira.
- A esfera do hero não existe abaixo de 760px, então nesse caso o botão de lâmpada volta a aparecer (ver a seção de Temas).
- O separador `/` entre cargo e cidade no hero é `hidden sm:inline`. Em tela estreita ele sobrava pendurado no fim da primeira linha.
- Os previews de projeto já não carregam em `pointer: coarse`, então o hover de vídeo não pesa no celular.

## Ícones

- Lib escolhida: [`pixelarticons`](https://github.com/halfmage/pixelarticons) (MIT, ~900 ícones pixel art). Não instalado como dependência — só os `path` SVG usados foram extraídos manualmente pra `src/lib/data/icons.ts` (projeto é pequeno demais pra justificar o pacote inteiro, que também não tem build pra Svelte, só React/Vue/webfont).
- **Ícone de marca (GitHub/LinkedIn/Discord) não usa o logo oficial** — usa um ícone genérico pixel art (`terminal`, `briefcase`, `message`) com o label ao lado identificando a plataforma. Dois motivos: (1) o logo oficial tem curva suave, quebraria a linguagem 100% pixel/blocada do resto do site; (2) `linkedin.svg` nem existe mais no principal banco de logos open source (`simple-icons`) por pedido de takedown — mais simples nem depender disso.
- Créditos do pacote em `THIRD-PARTY.md`, junto com a licença da Silkscreen. **Não apagar esse arquivo**: a MIT do pixelarticons e a OFL da Silkscreen exigem que o aviso viaje junto com o que é distribuído, e o README não guarda mais isso.

## UI: Tailwind 4 + Skeleton 5

Decisão do usuário (revisada — a primeira versão deste arquivo dizia "sem framework CSS"; ficou obsoleta). Este é um projeto de poucos dias, não algo contínuo: partir de uma base pronta vale mais que artesanato de CSS.

- Tailwind 4 via `@rsbuild/plugin-tailwindcss` (plugin oficial, integração trivial).
- Skeleton 5 (`@skeletonlabs/skeleton` + `@skeletonlabs/skeleton-svelte`) pelo sistema de tema/token e pelos componentes acessíveis quando precisar.
- **O que neutraliza a cara genérica do Skeleton é o tema**, não evitar a lib: `radius: 0`, fonte pixel nos headings, paleta de uma cor só de acento, zero sombra. Componente pronto do Skeleton só entra se couber nessa linguagem — se chegar com cara de "SaaS moderno" e exigir muito override, fazer à mão sai mais barato.
- Ordem dos `@import` em `src/index.css` importa: `tailwindcss` → `@skeletonlabs/skeleton` → tokens → tema → global. O `@source` no fim registra os componentes do skeleton-svelte pro scanner do Tailwind.

## Animações — os três efeitos assinatura

Todos falam a mesma língua: **um display CRT/retrô resolvendo uma imagem**. Coerência é o que faz parecer intencional em vez de "efeito que a IA achou legal".

1. **`pixelReveal`** (`src/lib/actions/pixelReveal.ts`) — o momento "como fizeram isso". Cobre o elemento com uma grade de blocos na cor do fundo e some com eles em **ordem de dithering Bayer 4x4** (`src/lib/actions/bayer.ts`), não aleatória. Efeito: o conteúdo materializa como imagem carregando em modem de 1998. Disparado por ScrollTrigger, uma vez só. Usado na lista de projetos.
2. **`letterPush`** (`src/lib/actions/letterPush.ts`) — o nome no hero é quebrado em `<span>` por letra e as letras fogem do cursor. **Easing `steps(4)`/`steps(5)`, nunca suave** — é o passo travado que faz parecer 8-bit em vez de "física de portfólio genérico". Herdado do portfolio-v2 abandonado, com o acabamento stepped que faltava.
3. **Campo topográfico em WebGL** (`DitherField.svelte` + `actions/ditherShader.ts`) — o efeito principal do hero. Fragment shader que gera um campo de ruído fbm, extrai curvas de nível e quantiza com **dithering Bayer 4x4 direto na GPU**, em blocos de 3px. Reage ao cursor (as curvas se deformam e acendem em volta dele) e ao scroll. WebGL2 puro, sem Three.js.
   - **Por que não react-three-fiber / Three.js**: pedido do usuário, avaliado e recusado. Three.js pesa ~600 KB contra ~6 KB deste shader; r3f é React; e portfólio com blob 3D flutuante virou o clichê que este projeto existe pra evitar. O shader ditherizado é raro na web e casa com a linguagem do site.
   - Cor lida em runtime dos tokens do tema (`--color-surface-700`, `--color-primary-500`), então trocar a paleta troca o shader junto.
   - Máscara elíptica em volta do bloco de texto derruba a intensidade pra 12%: sem isso as curvas passam por cima do nome e matam a legibilidade.
   - **`step(0.0, 0.0)` retorna 1 em GLSL.** A matriz Bayer tem uma entrada zero, então 1 de cada 16 blocos ficava aceso mesmo com intensidade zero e formava uma grade de pontos que nunca sumia. Por isso `bayerThreshold` termina em `* 0.9375 + 0.03125`: os limiares ficam em (0,1) aberto, nunca em 0.
   - **O `bottomFade` precisa terminar antes de `uv.y = -0.5`**, que é a borda de baixo da tela. Com o valor original (`smoothstep(-0.5, 0.02, uv.y)`) a metade inferior inteira ia apagando e sobrava uma faixa morta de uns 100px acima do indicador de scroll. Hoje é `smoothstep(-0.55, -0.28, uv.y)`: o campo chega no fim do hero e só suaviza na última fatia.
   - Pausa via `IntersectionObserver` quando sai da viewport, DPR limitado a 1.5, e desliga inteiro em `prefers-reduced-motion` ou se não houver WebGL2 (fallback: fundo liso, nada quebra).
4. **Esfera do hero** (`sphereLight()` dentro de `ditherShader.ts` + `actions/heroSphere.ts`) — bola ditherizada à direita do nome que troca o tema ao ser clicada.
   - **Não usa Three.js.** Foi pedido explicitamente com Threlte e recusado depois de medir: um bundle mínimo com só `IcosahedronGeometry`, `ShaderMaterial` e duas luzes dá **130 kB gzip**, contra 99 kB de todo o JS do site hoje. A esfera SDF custou 1,6 kB de GLSL.
   - **Interseção analítica, não raymarch.** Projeção ortográfica: `z = sqrt(r² - |p|²)`, custo O(1) por pixel. Um raymarch de ~48 passos com fbm por pixel derrubaria o frame rate, porque o shader roda por pixel mesmo quantizando em blocos de 3px.
   - O wobble são duas camadas: fbm 3D de 3 oitavas pro inchaço lento e um ruído de alta frequência correndo em sentido contrário pras ondulações finas. O raio é deslocado em função da normal, então a silhueta deforma junto.
   - **A esfera oclui o campo** (`intensity *= 1.0 - coverage`). Sem isso as curvas de nível passam por dentro dela e contaminam a cor, o que ficava especialmente feio no tema claro.
   - Hover: ímã puxando o centro 32% na direção de `uPointer` (que já vinha suavizado, e é esse atraso que dá a sensação elástica), cor misturando 60% em direção a `--color-surface-50`, e amplitude maior. Tudo quantizado em 5 degraus, nunca em fade.
   - **`onfocus` só liga o hover se casar com `:focus-visible`.** Sem isso, clicar na esfera deixa foco nela; ao voltar de outra aba o browser restaura o foco, o hover trava ligado e a bola persegue o cursor pela página inteira. Além disso `visibilitychange` e `blur` da janela soltam o hover, porque saindo da aba com o cursor em cima o `pointerleave` nunca dispara.
   - A área clicável é um `<button>` transparente com `cursor: none`, encolhido a 74% da caixa pra ficar inscrito no círculo: com a caixa cheia o cursor sumia nos cantos vazios, fora da bola.
   - Some abaixo de 760px de largura, em `prefers-reduced-motion` e sem WebGL2. O botão de lâmpada continua existindo pra quem já rolou a página.
5. **Preview de projeto** (`ProjectPreview.svelte`) — ao passar o mouse na linha, aparece o app rodando. **`<video>` WebM em vez de GIF**: os GIFs dos READMEs têm 3,9 MB e 7,8 MB, contra 78 KB e 113 KB dos WebM equivalentes, com imagem melhor. Projeto sem vídeo cai pro screenshot estático. Ancorado na direita seguindo só a vertical (seguir nos dois eixos tapava o texto), movimento em `steps(5)`, e `image-rendering: pixelated`.
   - Os vídeos só são baixados quando o elemento entra em cena, ou seja, no hover. O carregamento inicial continua sendo apenas JS + CSS + fonte.
6. **Scanlines por velocidade de scroll** (`Scanlines.svelte` + callback de velocidade no `smoothScroll.ts`) — linhas de varredura CRT que só aparecem enquanto se rola rápido, proporcionais à velocidade do Lenis. Em repouso são invisíveis. É o detalhe que ninguém espera.

Regras: nada de fade-up em cascata, nada de partícula de fundo, nada de texto digitando letra a letra. Hover de lista é **inversão de cor com `ease-[steps(3,jump-none)]`** (linha inteira vira `bg-primary-500` com texto escuro) — nunca hover-lift com sombra. Todos os efeitos respeitam `prefers-reduced-motion`.

## Regras de escrita (texto do site)

Feedback direto do usuário. Estas regras valem pra qualquer texto que apareça na tela:

- **Nunca usar travessão (—) no meio de frase.** É a marca registrada de texto gerado por IA. Usar ponto, vírgula, dois-pontos ou ponto e vírgula.
- **Nada de frase de efeito genérica.** Foi rejeitado: "nos projetos pessoais é onde testo o que não cabe no dia a dia", "Fora do teclado: trilha, moto e câmera na mão sempre que dá", "essas coisas". Se a frase caberia no portfólio de qualquer outro dev, ela não diz nada.
- **Fato concreto no lugar de adjetivo.** "rastreamento GPS que continua rodando com a tela bloqueada" vale mais que "aplicações de alto impacto".
- **A bio não cita projeto pelo nome.** A seção de Projetos já lista. Repetir o nome do app na bio é redundante e lê mal. A bio descreve capacidade, não catálogo.
- Detalhes do trabalho dele que ainda não estão no site, mas são bons de saber ao escrever texto: monorepo é o padrão do dia a dia, com **submódulos git e module federation**; a pós é **Master DevOps: Engineering & Tech Agile**.
- Fonte de verdade sobre o que ele faz hoje: o **perfil do GitHub** (github.com/br1ansouza) e os repos recentes. O conteúdo dos portfolios antigos está defasado e subestima ele.

## Curadoria de projetos

Regra: **poucos projetos fortes, todos de autoria própria**. Uma lista de 8 onde 6 são exercício de curso enfraquece as 2 boas.

- Listados hoje: TrackRide, Chromix, App Bank, API de Gestão de Filiais.
- **Nunca listar repositório que é fork.** Verificar com `gh api repos/br1ansouza/<repo> --jq .fork` antes de incluir. Foram cortados por esse motivo: `app-Projeto-WebCarros` e `Jogo-RPG-TS` (ambos fork, estavam no portfolio antigo como se fossem projeto próprio).
- Também cortados por serem exercício de 2024 redundante: `app-ecommerce`, `App-React-Farmacia`.
- O link "Mais em github.com/br1ansouza" no fim da seção cobre o resto sem poluir a lista.

## Certificados: carrossel infinito

A lista vertical de 11 certificados ficava longa e chata de ler. Virou uma faixa horizontal em `Certificates.svelte` + `actions/infiniteMarquee.ts`:

- **Loop infinito de verdade**: a lista é renderizada duas vezes e o deslocamento faz wrap no período exato. As cópias têm `tabindex="-1"` e `aria-hidden` pra não duplicar no leitor de tela nem no Tab.
- **O período é o `offsetLeft` do primeiro card da segunda cópia, nunca `scrollWidth / 2`.** Com 22 cards existem 21 gaps, mas um ciclo tem 11 cards e 11 gaps: `scrollWidth / 2` erra por meio gap (medido: 2808 contra 2816 corretos). Esses 8px acumulam a cada volta e produzem o salto que fazia o carrossel "resetar" e parecer lista comum.
- **Só anda com a roda do mouse em cima da faixa**, sem rolar a página junto. O primeiro card tem borda de acento, servindo de marcador de onde a volta começa.
- **`data-lenis-prevent` no container é obrigatório.** Sem ele o Lenis captura a roda no nível do documento, a página rola, o cursor sai da faixa e o carrossel congela. `preventDefault` sozinho não resolve, porque o Lenis não usa scroll nativo. Isso foi diagnosticado medindo o deslocamento travando em -990.
- **O destaque do card não pode usar `:hover` do CSS.** O browser só reavalia `:hover` quando o _ponteiro_ se move, não quando o elemento se move por baixo dele. Como a faixa desliza sob um cursor parado, o verde ficava preso no card errado e saltava junto com o wrap. A solução é detectar na mão: o action guarda a posição do ponteiro, chama `document.elementFromPoint` a cada frame em que a faixa se move, e informa o índice ativo por callback. O componente guarda esse índice em `$state` e escreve `data-active` no markup.
- **Cor do card ativo passa por variável CSS, não por seletor descendente.** O Svelte remove seletores como `.card[data-active] .card__year` porque não vê o atributo estaticamente. Definir `--card-year` e companhia no `.card` e trocá-las no estado ativo evita isso sem recorrer a `:global`.
- **Tentativa descartada**: `ScrollTrigger` com `pin` movendo a faixa conforme o scroll vertical. Funcionava, mas prende a página, que foi exatamente o que o usuário rejeitou.
- A faixa de captura tem só ~176px de altura, então mover o mouse pra fora já libera o scroll normal. Sem armadilha.
- **No touch a roda não existe, então a faixa também arrasta com o dedo** (`pointerdown`/`move`/`up` com `setPointerCapture` depois de 6px de folga). O mesmo arrasto vale pro mouse. Um clique que passou da folga é engolido no capture do `click`, senão soltar o dedo abriria o certificado.
- **`dragstart` precisa de `preventDefault`.** Os cards são `<a href>`, e âncora tem arrasto nativo do browser: no segundo `pointermove` o Chromium abria o drag-and-drop e disparava `pointercancel`, então a faixa andava 20px e travava. Diagnosticado logando os eventos: `pointerdown, pointermove, dragstart, pointercancel`.
- **`touch-action: pan-y` no viewport.** Deixa o browser cuidar do scroll vertical da página e sobra o horizontal pra gente. Verificado nos dois sentidos com `Input.dispatchTouchEvent` via CDP; `page.mouse` com `isMobile` não serve, porque emite `pointercancel` que não acontece no toque real.
- O indicador é o ícone `scrollX` (chevrons horizontais do pixelarticons) ao lado do título, na cor de acento, com uma oscilação em `steps(3)`. Texto explicativo foi descartado a pedido do usuário.

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

- Stack: Svelte 5 (runes) + TypeScript + Rsbuild + Tailwind 4 + Skeleton 5 + GSAP + Lenis. Sem React nem lib do ecossistema React (as versões antigas eram React; esta é a saída deliberada).
- **TypeScript fixado em `^6.0.0`, não 7.x.** TS 7 (compilador nativo/Go) quebra `svelte-check` e `typescript-eslint` até a API programática estabilizar na 7.1 (previsão ~out/2026). Reavaliar a atualização quando isso sair.
- Gerenciador de pacotes: npm.
- Estrutura em `src/`:
  - `lib/components/` — seções da página e subcomponentes.
  - `lib/data/` — conteúdo tipado (perfil, projetos, certificados, skills, ícones).
  - `lib/types/` — interfaces compartilhadas.
  - `lib/styles/` — `tokens.css` (fontes + `@theme`), `theme.css` (tema Skeleton), `global.css` (reset).
  - `lib/actions/` — Svelte actions e integrações que não são componente (Lenis/GSAP, pixelReveal, letterPush, bayer).
  - `lib/fonts/` — woff2 da Silkscreen (self-hospedada).
- Tipagem: nunca `any`; tipos explícitos. Arquivo que usa runes (`$state`, `$derived`, `$effect`) fora de componente precisa ser `.svelte.ts`, nunca `.ts` puro.
- Cores: nunca hex/rgb hardcoded em componente. Sempre classe Tailwind do tema (`bg-surface-900`, `text-primary-500`) ou `var(--color-*)` em bloco `<style>`.
- **Validar visualmente antes de dar por pronto.** `npm run check` passar não significa que a tela está boa — os problemas reais deste projeto (fonte pixel borrada, borda dupla, espaço morto) só apareceram em screenshot. Subir o dev server e olhar com browser headless (Playwright instalado no scratchpad da sessão).
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

- 2026-08-06: repositório criado; casca (Rsbuild + Svelte 5 + TS), navbar/footer removidos, ícones pixelarticons.
- 2026-08-06 (mesma sessão, depois): Tailwind 4 + Skeleton 5 adotados, tema `pixel` customizado, Silkscreen self-hospedada, as 5 seções construídas e os 3 efeitos assinatura implementados. Validado por screenshot em headless: sem erro de console, hover de inversão funcionando, fonte pixel crispa.
- 2026-08-08: site bilíngue EN/PT com inglês padrão, campo do shader estendido até o fim do hero, colunas do Sobre reequilibradas, `ProjectCard` morto e `profile.jpg` removidos. **A foto de perfil está fora do site por decisão explícita do usuário ("não quero foto ou imagem minha"), não é pendência.**

**BUG RESOLVIDO:** o campo do shader não renderizava na máquina do usuário (Brave, Windows, GPU real). Screenshot dele em 2026-08-08 mostra o campo no ar. O que estava no caminho era a indexação dinâmica de array `const` no shader, trocada por Bayer aritmético.

**Pendente:**

- API de Gestão e Simulador RPG não têm screenshot (só logo no portfolio antigo), então não têm preview no hover. Ou gerar uma imagem, ou aceitar a assimetria.
- Decisões abertas do `CONTENT.md` (deploy e visibilidade do repo continuam em aberto; idioma, foto e curadoria já fechados).
