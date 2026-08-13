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
      en: 'I work mainly with React and TypeScript, building and evolving scalable web applications. In my day-to-day work, I contribute to a modular frontend ecosystem, with multiple modules integrated through Module Federation and REST APIs backed by a microservices architecture.',
      pt: 'Trabalho principalmente com React e TypeScript na construção e evolução de aplicações web escaláveis. No dia a dia, atuo em um ecossistema frontend modular, com múltiplos módulos integrados por Module Federation e consumo de APIs REST sobre uma arquitetura de microsserviços.',
    },
    {
      en: 'I also build mobile applications with React Native and APIs with Node.js, TypeORM and PostgreSQL. In personal projects I work across the whole product and explore new tools — currently Svelte — to solve problems such as background geolocation, offline maps and experiences that extend beyond the browser.',
      pt: 'Também desenvolvo aplicações mobile com React Native e APIs com Node.js, TypeORM e PostgreSQL. Nos projetos autorais, exploro o produto de ponta a ponta e experimento novas ferramentas — atualmente Svelte — para resolver problemas como geolocalização em segundo plano, mapas offline e experiências que vão além do navegador.',
    },
    {
      en: 'I hold a degree in Systems Analysis and Development from Unisul and am currently pursuing the Master DevOps: Engineering & Tech Agile postgraduate program. I continue expanding that foundation with Docker, AWS, Linux and CI/CD pipelines.',
      pt: 'Sou formado em Análise e Desenvolvimento de Sistemas pela Unisul e curso a pós-graduação Master DevOps: Engineering & Tech Agile. Amplio essa base com Docker, AWS, Linux e pipelines de CI/CD.',
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
