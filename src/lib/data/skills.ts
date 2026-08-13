import type { TechCategory } from '../types';

export const techCategories: TechCategory[] = [
  {
    title: { en: 'Frontend', pt: 'Frontend' },
    items: ['TypeScript', 'React', 'Svelte', 'JavaScript'],
  },
  {
    title: { en: 'Backend', pt: 'Backend' },
    items: ['Node.js', 'Express', 'TypeORM', 'PostgreSQL'],
  },
  {
    title: { en: 'Mobile', pt: 'Mobile' },
    items: ['React Native', 'Expo', 'Capacitor', 'Kotlin'],
  },
  {
    title: { en: 'Architecture', pt: 'Arquitetura' },
    items: ['Module Federation', 'Monorepo', 'Microservices', 'REST APIs'],
  },
  {
    title: { en: 'DevOps', pt: 'DevOps' },
    items: ['Docker', 'AWS', 'Linux', 'GitHub Actions', 'CI/CD'],
  },
];
