import type { ThemeName } from '../types';

const STORAGE_KEY = 'portfolio:theme';

function readInitial(): ThemeName {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'pixel' || saved === 'pixel-light') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'pixel-light'
    : 'pixel';
}

class ThemeStore {
  current = $state<ThemeName>('pixel');

  init() {
    this.current = readInitial();
    document.documentElement.dataset.theme = this.current;
  }

  toggle() {
    this.current = this.current === 'pixel' ? 'pixel-light' : 'pixel';
    document.documentElement.dataset.theme = this.current;
    localStorage.setItem(STORAGE_KEY, this.current);
  }
}

export const theme = new ThemeStore();
