export type SocialIconName = 'mail' | 'github' | 'linkedin' | 'discord';

export interface SocialLink {
  label: string;
  url: string;
  icon: SocialIconName;
}

export interface TechCategory {
  title: string;
  items: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Certificate {
  name: string;
  institution: string;
  date: string;
  link: string;
}
