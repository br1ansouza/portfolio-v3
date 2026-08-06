import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { bayerOrder } from './bayer';
import type { Action } from 'svelte/action';

interface PixelRevealOptions {
  columns?: number;
  rows?: number;
  duration?: number;
  start?: string;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const pixelReveal: Action<
  HTMLElement,
  PixelRevealOptions | undefined
> = (node, options) => {
  if (prefersReducedMotion()) return;

  gsap.registerPlugin(ScrollTrigger);

  const columns = options?.columns ?? 16;
  const rows = options?.rows ?? 10;
  const duration = options?.duration ?? 0.9;
  const start = options?.start ?? 'top 80%';
  const total = columns * rows;

  const overlay = document.createElement('div');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.cssText = [
    'position:absolute',
    'inset:0',
    'display:grid',
    'pointer-events:none',
    'z-index:2',
    `grid-template-columns:repeat(${columns},1fr)`,
    `grid-template-rows:repeat(${rows},1fr)`,
  ].join(';');

  const blocks: HTMLElement[] = [];
  for (let i = 0; i < total; i += 1) {
    const block = document.createElement('span');
    block.style.cssText = 'background:var(--color-surface-950)';
    overlay.appendChild(block);
    blocks.push(block);
  }

  if (getComputedStyle(node).position === 'static')
    node.style.position = 'relative';
  node.appendChild(overlay);

  const order = bayerOrder(columns, rows);

  const tween = gsap.to(blocks, {
    opacity: 0,
    duration: 0.01,
    ease: 'none',
    paused: true,
    stagger: (index: number) => (order[index] / total) * duration,
    onComplete: () => overlay.remove(),
  });

  const trigger = ScrollTrigger.create({
    trigger: node,
    start,
    once: true,
    onEnter: () => tween.play(),
  });

  return {
    destroy() {
      trigger.kill();
      tween.kill();
      overlay.remove();
    },
  };
};
