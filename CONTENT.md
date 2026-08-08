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

## Projetos (curados)

Todos de autoria própria, nenhum fork. Ver regra de curadoria no CLAUDE.md.

1. **TrackRide** (2026) — Svelte 5, TypeScript, Ruby on Rails, PostGIS, Capacitor, MapLibre
2. **Chromix** (2026) — Kotlin, Jetpack Compose, MVVM, DataStore
3. **App Bank** (2025) — React Native, TypeScript, Expo, JWT, Node.js
4. **API de Gestão de Filiais e Produtos** (2025) — Node.js, Express, TypeScript, TypeORM, PostgreSQL

Cortados: WebCarros e Jogo RPG (forks), E-commerce e Farmácia (exercício de 2024 redundante).

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

## Decisões abertas

1. **Deploy**: ainda não escolhido (Netlify, Vercel, Cloudflare Pages). O portfolio v1 usava Netlify.
2. **Visibilidade**: repositório privado. Vira público quando estiver apresentável.
3. **Ano de "Ambientes Computacionais e Conectividade"**: assumido 2025 (Unisul). Confirmar.
4. **API de Gestão não tem screenshot**, então é o único projeto sem preview no hover.

## Decisões fechadas

- **Paleta e fonte**: verde terminal + Silkscreen no escuro, laranja queimado no claro. Trocar é editar `src/lib/styles/theme.css`.
- **Idioma** (2026-08-08): bilíngue EN/PT, inglês como padrão para todo mundo, botão de troca abaixo do de tema. Texto das duas línguas mora junto em `src/lib/data/*.ts`.
- **Foto de perfil** (2026-08-08): fora do site. Nenhuma foto ou imagem do Brian em nenhuma seção. `src/lib/images/profile.jpg` foi apagado.
