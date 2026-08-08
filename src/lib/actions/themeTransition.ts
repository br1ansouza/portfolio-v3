import { theme } from '../stores/theme.svelte';
import { ditherWipe } from './ditherWipe';
import type { ThemeName } from '../types';

let busy = false;

function incomingBackground(target: ThemeName): string {
  const probe = document.createElement('div');
  probe.dataset.theme = target;
  probe.style.cssText =
    'position:fixed;left:-9999px;width:1px;height:1px;background:var(--color-surface-950)';
  document.body.appendChild(probe);
  const color = getComputedStyle(probe).backgroundColor;
  probe.remove();
  return color;
}

export async function runThemeToggle(onSwap?: () => void): Promise<void> {
  if (busy) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    theme.toggle();
    onSwap?.();
    return;
  }

  busy = true;
  const target: ThemeName = theme.current === 'pixel' ? 'pixel-light' : 'pixel';
  await ditherWipe(incomingBackground(target), () => {
    theme.toggle();
    onSwap?.();
  });
  busy = false;
}
