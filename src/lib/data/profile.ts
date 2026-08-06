import type { SocialLink } from '../types';

export const profile = {
  name: 'Brian Souza',
  role: 'Desenvolvedor Front-end',
  location: 'Florianópolis, BR',
  bio: [
    'Desenvolvedor front-end em Florianópolis. No trabalho é React, TypeScript e Node; nos projetos pessoais é onde testo o que não cabe no dia a dia — Svelte, layout pixel art, essas coisas.',
    'Fora do teclado: trilha, moto e câmera na mão sempre que dá.',
  ],
};

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
