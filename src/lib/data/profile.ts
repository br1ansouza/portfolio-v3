import type { Education, Localized, SocialLink } from '../types';

interface Profile {
  name: string;
  role: Localized;
  location: Localized;
  bio: Localized[];
}

export const profile: Profile = {
  name: 'Brian Souza',
  role: {
    en: 'Front-end and Mobile Developer',
    pt: 'Desenvolvedor Front-end e Mobile',
  },
  location: { en: 'Florianópolis, Brazil', pt: 'Florianópolis, BR' },
  bio: [
    {
      en: 'I work with React and TypeScript on scalable applications, consuming REST APIs over a microservices architecture, with automated tests in Playwright and a monorepo setup.',
      pt: 'Trabalho com React e TypeScript em aplicações escaláveis, integrando APIs REST sobre arquitetura de microsserviços, com testes automatizados em Playwright e ambiente monorepo.',
    },
    {
      en: 'On my own projects I handle the whole stack: a Ruby on Rails API with PostGIS, hybrid Android with Capacitor and native Android in Kotlin. That is where I solved GPS tracking that keeps running with the screen locked and maps that work with no network.',
      pt: 'Nos meus projetos toco a stack inteira: API em Ruby on Rails com PostGIS e Android, híbrido com Capacitor e nativo em Kotlin. Foi neles que resolvi GPS rodando em segundo plano com a tela bloqueada e mapa funcionando sem rede.',
    },
    {
      en: 'I am taking the Master DevOps: Engineering & Tech Agile graduate program. CI pipeline with lint, security analysis and build stages, plus Docker, AWS and Linux.',
      pt: 'Curso a pós Master DevOps: Engineering & Tech Agile. Pipeline de CI com etapas de lint, análise de segurança e build, e trabalho com Docker, AWS e Linux.',
    },
  ],
};

export const education: Education[] = [
  {
    course: {
      en: 'Master DevOps: Engineering & Tech Agile',
      pt: 'Master DevOps: Engineering & Tech Agile',
    },
    institution: { en: 'In progress', pt: 'Em andamento' },
    period: '2026',
    link: undefined,
  },
  {
    course: {
      en: 'Systems Analysis and Development',
      pt: 'Análise e Desenvolvimento de Sistemas',
    },
    institution: { en: 'Unisul', pt: 'Unisul' },
    period: '2024 - 2026',
    link: 'https://drive.google.com/file/d/1wDii3qvMZOE0_0w8AWWVXLkOvfMqPuEH/view?usp=sharing',
  },
  {
    course: {
      en: 'Full Stack Development',
      pt: 'Desenvolvimento Full Stack',
    },
    institution: { en: 'SENAI / LAB365', pt: 'SENAI / LAB365' },
    period: '2024 - 2025',
    link: 'https://drive.google.com/file/d/1fQTwMoMofadk9GqVy6hvvqSwRRiRbimX/view?usp=drive_link',
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: { en: 'LinkedIn', pt: 'LinkedIn' },
    url: 'https://www.linkedin.com/in/brian-souza/',
    icon: 'linkedin',
  },
  {
    label: { en: 'GitHub', pt: 'GitHub' },
    url: 'https://github.com/br1ansouza',
    icon: 'github',
  },
  {
    label: { en: 'Discord', pt: 'Discord' },
    url: 'https://discord.com/users/br1ansouza',
    icon: 'discord',
  },
];
