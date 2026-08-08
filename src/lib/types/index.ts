export type SocialIconName =
  'github' | 'linkedin' | 'discord' | 'scrollX' | 'lampOn' | 'lampOff';

export type ThemeName = 'pixel' | 'pixel-light';

export type Language = 'en' | 'pt';

export type Localized = Record<Language, string>;

export interface SocialLink {
  label: Localized;
  url: string;
  icon: SocialIconName;
}

export interface TechCategory {
  title: Localized;
  items: string[];
}

export interface Project {
  slug: string;
  title: Localized;
  description: Localized;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  image?: string;
  video?: string;
}

export interface Certificate {
  name: Localized;
  institution: string;
  date: string;
  link: string;
}

export interface Education {
  course: Localized;
  institution: Localized;
  period: string;
  link?: string;
}
