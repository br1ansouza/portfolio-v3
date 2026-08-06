# Conteúdo — rascunho pra validar

Tudo aqui é rascunho extraído/condensado dos portfolios antigos
(`br1ansouza/portfolio` e `br1ansouza/portfolio-v2`). Já está espelhado em
`src/lib/data/*.ts` pra provar que a estrutura funciona — mas o texto em si
ainda não está aprovado. Edite aqui ou direto no código, o que for mais fácil.

## Perfil

- Nome: Brian Souza
- Localização: Florianópolis, BR
- Cargo/tagline: Desenvolvedor Front-end
- Bio (2 frases, ver `src/lib/data/profile.ts`):
  1. "Desenvolvedor front-end em Florianópolis. No trabalho é React, TypeScript e Node; nos projetos pessoais é onde testo o que não cabe no dia a dia — Svelte, layout pixel art, essas coisas."
  2. "Fora do teclado: trilha, moto e câmera na mão sempre que dá."

## Contato

- E-mail: briandesouza1597@gmail.com
- LinkedIn: linkedin.com/in/brian-souza
- GitHub: github.com/br1ansouza
- Discord: br1ansouza

## Formação acadêmica (estava no Resumo do portfolio v1 — não é experiência profissional)

- Análise e Desenvolvimento de Sistemas — Unisul (2024–2025)
- Dev Full-Stack Jr — SENAI/SC (jul/2024–mai/2025)
- Gestão de Tecnologia da Informação — Univates (2020–2022)
- Ensino Médio — IECEG (2017–2019)

## Skills por categoria

- Frontend: TypeScript, React, Svelte, JavaScript
- Backend: Node.js, Express, NestJS, TypeORM
- Banco de Dados: PostgreSQL, MariaDB
- Ferramentas: Git, Docker, Postman

## Projetos (extraídos do portfolio v1 — curar antes de publicar, não jogar os 6 sem filtro)

Sugestão de destaque (mais robustos como peça de portfolio):

1. **App Bank** — app bancário mobile (React Native, TypeScript, Expo, JWT, Node.js). github.com/br1ansouza/App-Bank
2. **API de Gestão de Filiais e Produtos** — API REST (Node.js, Express, TypeScript, TypeORM, PostgreSQL). github.com/br1ansouza/api-gestao-filiais-produtos
3. **WebCarros** — avaliação de veículos (TypeScript, React Native, Expo). github.com/br1ansouza/app-Projeto-WebCarros
4. **Plataforma E-commerce** — catálogo com busca e carrinho (JavaScript, React Native, Expo). github.com/br1ansouza/app-ecommerce

Candidatos a cortar da vitrine principal (ficam só linkados no GitHub, se sobrar espaço):

5. **Farmácia App** — parecido em escopo com WebCarros/E-commerce. github.com/br1ansouza/App-React-Farmacia
6. **Simulador de Combate RPG** — exercício de POO, não é bem um "produto". github.com/br1ansouza/Jogo-RPG-TS

## Certificados (base — 7 já existentes, ver `src/lib/data/certificates.ts`)

| Certificado                             | Instituição | Ano  |
| --------------------------------------- | ----------- | ---- |
| BackEnd - Módulo 2                      | LAB365      | 2025 |
| FrontEnd - Módulo 1                     | LAB365      | 2024 |
| Desenvolvimento Web Compacto e Completo | Udemy       | 2023 |
| Fundamentos de Programação              | Udemy       | 2022 |
| Git                                     | Udemy       | 2022 |
| Arquitetura de Redes                    | Udemy       | 2023 |
| Proxmox - Professional                  | Udemy       | 2023 |

Novos certificados entram por último, perto do fim do projeto (decisão do usuário — não é bloqueio pro resto).

## Imagens disponíveis nos portfolios antigos (ainda não copiadas pra cá)

- Foto de perfil e fotos pessoais (`portfolio/src/assets/profile-images/`, `portfolio-v2/src/assets/photos/`).
- Screenshots dos projetos (`portfolio/src/assets/projects-images/**`) — App Bank, E-commerce, Farmácia, WebCarros têm capturas de tela reais; API de Gestão e RPG só têm logo.
- PDF de currículo (`portfolio/public/Profile.pdf`) — desatualizado, precisa revisão antes de reusar.

## Decisões abertas — validar antes da fase de implementação visual

1. **Idioma único PT-BR, sem toggle EN** — ok, ou mantém bilíngue como nas versões antigas?
2. **Curadoria de projetos**: confirma os 4 em destaque sugeridos acima, ou troca algum?
3. **Formação acadêmica**: entra (compacta, dentro do Sobre) ou fica de fora?
4. **Paleta de cor e fonte pixel/bitmap**: ainda não escolhidas — `src/lib/styles/tokens.css` está com placeholder. Pesquisar referências (NES/PICO-8, Press Start 2P, Silkscreen, Pixelify Sans) na fase de implementação visual.
5. **Nome do repositório**: criado como `portfolio-v3` (os nomes `portfolio` e `portfolio-v2` já existem na conta). Renomear é trivial se quiser outro nome.
6. **Visibilidade**: repositório está **privado** por enquanto — mesmo padrão do `portfolio-v2` enquanto ele ficava incompleto. Fica público quando o site estiver apresentável.
7. **Deploy**: ainda não escolhido (Netlify, Vercel, Cloudflare Pages...). O `portfolio` v1 usava Netlify em produção.
