import type { TechCategory } from '../types';

export const techCategories: TechCategory[] = [
  { title: 'Frontend', items: ['TypeScript', 'React', 'Svelte', 'JavaScript'] },
  {
    title: 'Backend',
    items: ['Ruby on Rails', 'Node.js', 'PostgreSQL', 'PostGIS'],
  },
  {
    title: 'Mobile',
    items: ['Kotlin', 'Jetpack Compose', 'Capacitor', 'React Native'],
  },
  { title: 'Testes', items: ['Playwright'] },
  {
    title: 'DevOps',
    items: ['Docker', 'AWS', 'Linux', 'GitHub Actions', 'CI/CD'],
  },
];
