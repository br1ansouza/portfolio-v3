import trackrideVideo from '../videos/trackride.webm';
import chromixVideo from '../videos/chromix.webm';
import trackride from '../images/projects/trackride.png';
import pistacerta from '../images/projects/pistacerta.png';
import chromix from '../images/projects/chromix.png';
import appBank from '../images/projects/app-bank.png';
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
      en: 'Car guessing game built around Brazilian motoring culture. Twelve clues are revealed one at a time and the answer never leaves the server until you commit, so it cannot be read from devtools mid-round.',
      pt: 'Jogo de adivinhação de carros da cultura automotiva brasileira. Doze pistas reveladas uma a uma, e a resposta só sai do servidor quando você responde — não dá para ler no devtools durante a rodada.',
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
    liveUrl: 'https://pistacerta.br1ansouza.workers.dev',
    featured: true,
    image: pistacerta,
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
    slug: 'app-bank',
    title: { en: 'App Bank', pt: 'App Bank' },
    description: {
      en: 'Mobile banking app with JWT authentication, balance, recent transactions, spending chart and virtual card.',
      pt: 'Aplicativo bancário mobile com autenticação JWT, saldo, transações recentes, gráfico de gastos e cartão virtual.',
    },
    technologies: ['React Native', 'TypeScript', 'Expo', 'JWT', 'Node.js'],
    githubUrl: 'https://github.com/br1ansouza/App-Bank',
    featured: true,
    image: appBank,
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
