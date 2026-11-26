import trackrideVideo from '../videos/trackride.webm';
import chromixVideo from '../videos/chromix.webm';
import pistacertaVideo from '../videos/pistacerta.webm';
import listavivaVideo from '../videos/listaviva.webm';
import trackride from '../images/projects/trackride.png';
import pistacerta from '../images/projects/pistacerta.png';
import chromix from '../images/projects/chromix.png';
import listaviva from '../images/projects/listaviva.png';
import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'trackride',
    title: { en: 'TrackRide', pt: 'TrackRide' },
    description: {
      en: 'Motorcycle route planner with per-leg weather forecast, rain and wind alerts, live GPS tracking with the screen locked and an offline mode that downloads the map tiles before the trip.',
      pt: 'Planejador de rotas de moto com previsão de clima por trecho, alerta de chuva e vento, rastreamento GPS ao vivo com a tela bloqueada e modo offline que baixa os tiles do mapa antes da viagem.',
    },
    technologies: [
      'Svelte 5',
      'TypeScript',
      'Ruby on Rails',
      'PostGIS',
      'Capacitor',
      'MapLibre',
    ],
    githubUrl: 'https://github.com/br1ansouza/TrackRide',
    featured: true,
    image: trackride,
    video: trackrideVideo,
  },
  {
    slug: 'pistacerta',
    title: { en: 'PistaCerta', pt: 'PistaCerta' },
    description: {
      en: 'Car guessing game built around Brazilian motoring culture. Twelve clues are revealed one at a time, from year and price up to the engine code, and the catalogue is curated rather than scraped: every spec is checked against a named source.',
      pt: 'Jogo de adivinhação de carros da cultura automotiva brasileira. Doze pistas reveladas uma a uma, do ano e preço até o código do motor, com catálogo curado à mão: cada spec conferida contra uma fonte registrada.',
    },
    technologies: [
      'React 19',
      'TypeScript 7',
      'Rsbuild',
      'Tailwind 4',
      'Cloudflare Workers',
      'Bun',
    ],
    githubUrl: 'https://github.com/br1ansouza/pistacerta-game',
    featured: true,
    image: pistacerta,
    video: pistacertaVideo,
  },
  {
    slug: 'chromix',
    title: { en: 'Chromix', pt: 'Chromix' },
    description: {
      en: 'Ball Sort puzzle for Android with endless levels generated on the spot. A solver walks the board before handing the level over, so no impossible layout ever reaches the player.',
      pt: 'Puzzle Ball Sort para Android com fases infinitas geradas na hora. Um solver percorre o tabuleiro antes de entregar a fase, garantindo que nenhuma configuração impossível chegue no jogador.',
    },
    technologies: ['Kotlin', 'Jetpack Compose', 'MVVM', 'DataStore'],
    githubUrl: 'https://github.com/br1ansouza/Chromix',
    featured: true,
    image: chromix,
    video: chromixVideo,
  },
  {
    slug: 'listaviva',
    title: { en: 'ListaViva', pt: 'ListaViva' },
    description: {
      en: 'Real-time collaborative lists with no sign-up. Create one, drop the link in the group chat and everyone edits together, watching each item get crossed off live. Shopping lists add up quantity and price as you go.',
      pt: 'Listas colaborativas em tempo real, sem cadastro. Você cria, manda o link no grupo e todo mundo edita junto, vendo cada item ser riscado na hora. A lista de compras soma quantidade e preço enquanto você anda pelo mercado.',
    },
    technologies: [
      'React 19',
      'TypeScript',
      'Ruby on Rails',
      'Action Cable',
      'PostgreSQL',
      'Cloudflare Workers',
    ],
    githubUrl: 'https://github.com/br1ansouza/listaviva',
    featured: true,
    image: listaviva,
    video: listavivaVideo,
  },
  {
    slug: 'api-gestao',
    title: {
      en: 'Branch and Product Management API',
      pt: 'API de Gestão de Filiais e Produtos',
    },
    description: {
      en: 'RESTful API to manage branches, products and transfers between units, with JWT authentication, Bcrypt password hashing and Swagger documentation.',
      pt: 'API RESTful para gerenciar filiais, produtos e movimentações entre unidades, com autenticação JWT, senhas com Bcrypt e documentação Swagger.',
    },
    technologies: ['Node.js', 'Express', 'TypeScript', 'TypeORM', 'PostgreSQL'],
    githubUrl: 'https://github.com/br1ansouza/api-gestao-filiais-produtos',
    featured: true,
  },
];
