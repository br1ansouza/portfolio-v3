import type { Project } from '../types';

export const projects: Project[] = [
  {
    slug: 'app-bank',
    title: 'App Bank',
    description:
      'Aplicativo bancário mobile com autenticação JWT, saldo, transações recentes, gráfico de gastos e cartão virtual.',
    technologies: ['React Native', 'TypeScript', 'Expo', 'JWT', 'Node.js'],
    githubUrl: 'https://github.com/br1ansouza/App-Bank',
    featured: true,
  },
  {
    slug: 'api-gestao',
    title: 'API de Gestão de Filiais e Produtos',
    description:
      'API RESTful para gerenciar filiais, produtos e movimentações entre unidades, com auth JWT e documentação Swagger.',
    technologies: ['Node.js', 'Express', 'TypeScript', 'TypeORM', 'PostgreSQL'],
    githubUrl: 'https://github.com/br1ansouza/api-gestao-filiais-produtos',
    featured: true,
  },
  {
    slug: 'webcarros',
    title: 'WebCarros',
    description:
      'App para compartilhar avaliações de automóveis e navegar por anúncios, com autenticação e catálogo.',
    technologies: ['TypeScript', 'React Native', 'Expo'],
    githubUrl: 'https://github.com/br1ansouza/app-Projeto-WebCarros',
    featured: true,
  },
  {
    slug: 'ecommerce',
    title: 'Plataforma E-commerce',
    description:
      'Listagem de produtos com busca, rolagem infinita e carrinho de compras.',
    technologies: ['JavaScript', 'React Native', 'Expo'],
    githubUrl: 'https://github.com/br1ansouza/app-ecommerce',
    featured: true,
  },
  {
    slug: 'farmacia',
    title: 'Farmácia App',
    description:
      'Gestão de estoque, usuários e movimentações de uma farmácia fictícia, com níveis de acesso.',
    technologies: ['JavaScript', 'TypeScript', 'React Native', 'Expo'],
    githubUrl: 'https://github.com/br1ansouza/App-React-Farmacia',
    featured: false,
  },
  {
    slug: 'rpg-combat-simulator',
    title: 'Simulador de Combate RPG',
    description:
      'Simulação de combate em TypeScript explorando herança, encapsulamento e polimorfismo.',
    technologies: ['TypeScript'],
    githubUrl: 'https://github.com/br1ansouza/Jogo-RPG-TS',
    featured: false,
  },
];
