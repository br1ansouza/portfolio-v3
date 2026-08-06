import trackrideVideo from '../videos/trackride.webm';
import chromixVideo from '../videos/chromix.webm';
import trackride from '../images/projects/trackride.png';
import chromix from '../images/projects/chromix.png';
import appBank from '../images/projects/app-bank.png';
import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'trackride',
    title: 'TrackRide',
    description:
      'Planejador de rotas de moto com previsão de clima por trecho, alerta de chuva e vento, rastreamento GPS ao vivo com a tela bloqueada e modo offline que baixa os tiles do mapa antes da viagem.',
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
    slug: 'chromix',
    title: 'Chromix',
    description:
      'Puzzle Ball Sort para Android com fases infinitas geradas na hora. Um solver percorre o tabuleiro antes de entregar a fase, garantindo que nenhuma configuração impossível chegue no jogador.',
    technologies: ['Kotlin', 'Jetpack Compose', 'MVVM', 'DataStore'],
    githubUrl: 'https://github.com/br1ansouza/Chromix',
    featured: true,
    image: chromix,
    video: chromixVideo,
  },
  {
    slug: 'app-bank',
    title: 'App Bank',
    description:
      'Aplicativo bancário mobile com autenticação JWT, saldo, transações recentes, gráfico de gastos e cartão virtual.',
    technologies: ['React Native', 'TypeScript', 'Expo', 'JWT', 'Node.js'],
    githubUrl: 'https://github.com/br1ansouza/App-Bank',
    featured: true,
    image: appBank,
  },
  {
    slug: 'api-gestao',
    title: 'API de Gestão de Filiais e Produtos',
    description:
      'API RESTful para gerenciar filiais, produtos e movimentações entre unidades, com autenticação JWT, senhas com Bcrypt e documentação Swagger.',
    technologies: ['Node.js', 'Express', 'TypeScript', 'TypeORM', 'PostgreSQL'],
    githubUrl: 'https://github.com/br1ansouza/api-gestao-filiais-produtos',
    featured: true,
  },
];
