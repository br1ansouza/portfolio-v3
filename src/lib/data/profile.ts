import type { Education, SocialLink } from '../types';

export const profile = {
  name: 'Brian Souza',
  role: 'Desenvolvedor Front-end e Mobile',
  location: 'Florianópolis, BR',
  bio: [
    'Trabalho com React e TypeScript em aplicações escaláveis, integrando APIs REST sobre arquitetura de microsserviços, com testes automatizados em Playwright e ambiente monorepo.',
    'Nos meus projetos toco a stack inteira: API em Ruby on Rails com PostGIS e Android, híbrido com Capacitor e nativo em Kotlin. Foi neles que resolvi GPS rodando em segundo plano com a tela bloqueada e mapa funcionando sem rede.',
    'Curso a pós Master DevOps: Engineering & Tech Agile. Pipeline de CI com etapas de lint, análise de segurança e build, e trabalho com Docker, AWS e Linux.',
  ],
};

export const education: Education[] = [
  {
    course: 'Master DevOps: Engineering & Tech Agile',
    institution: 'Em andamento',
    period: '2026',
    link: undefined,
  },
  {
    course: 'Análise e Desenvolvimento de Sistemas',
    institution: 'Unisul',
    period: '2024 a 2026',
    link: 'https://drive.google.com/file/d/1wDii3qvMZOE0_0w8AWWVXLkOvfMqPuEH/view?usp=sharing',
  },
  {
    course: 'Desenvolvimento Full Stack',
    institution: 'SENAI / LAB365',
    period: '2024 a 2025',
    link: 'https://drive.google.com/file/d/1fQTwMoMofadk9GqVy6hvvqSwRRiRbimX/view?usp=drive_link',
  },
];

export const socialLinks: SocialLink[] = [
  { label: 'E-mail', url: 'mailto:briandesouza1597@gmail.com', icon: 'mail' },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/brian-souza/',
    icon: 'linkedin',
  },
  { label: 'GitHub', url: 'https://github.com/br1ansouza', icon: 'github' },
  {
    label: 'Discord',
    url: 'https://discord.com/users/br1ansouza',
    icon: 'discord',
  },
];
