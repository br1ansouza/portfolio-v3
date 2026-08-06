export type SocialIconName =
  'mail' | 'github' | 'linkedin' | 'discord' | 'scrollX';

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
  image?: string;
  video?: string;
}

export interface Certificate {
  name: string;
  institution: string;
  date: string;
  link: string;
}

export interface Education {
  course: string;
  institution: string;
  period: string;
  link?: string;
}
