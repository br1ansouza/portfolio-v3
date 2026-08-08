import type { TechCategory } from '../types';

export const techCategories: TechCategory[] = [
  {
    title: { en: 'Frontend', pt: 'Frontend' },
    items: ['TypeScript', 'React', 'Svelte', 'JavaScript'],
  },
  {
    title: { en: 'Backend', pt: 'Backend' },
    items: ['Ruby on Rails', 'Node.js', 'PostgreSQL', 'PostGIS'],
  },
  {
    title: { en: 'Mobile', pt: 'Mobile' },
    items: ['Kotlin', 'Jetpack Compose', 'Capacitor', 'React Native'],
  },
  { title: { en: 'Testing', pt: 'Testes' }, items: ['Playwright'] },
  {
    title: { en: 'DevOps', pt: 'DevOps' },
    items: ['Docker', 'AWS', 'Linux', 'GitHub Actions', 'CI/CD'],
  },
];
