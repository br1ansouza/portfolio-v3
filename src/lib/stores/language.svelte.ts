import type { Language, Localized } from '../types';

const STORAGE_KEY = 'portfolio:language';

const HTML_LANG: Record<Language, string> = {
  en: 'en',
  pt: 'pt-BR',
};

function readInitial(): Language {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === 'pt' || saved === 'en' ? saved : 'en';
}

class LanguageStore {
  current = $state<Language>('en');

  init() {
    this.current = readInitial();
    document.documentElement.lang = HTML_LANG[this.current];
  }

  toggle() {
    this.current = this.current === 'en' ? 'pt' : 'en';
    document.documentElement.lang = HTML_LANG[this.current];
    localStorage.setItem(STORAGE_KEY, this.current);
  }
}

export const language = new LanguageStore();

export function t(value: Localized): string {
  return value[language.current];
}
