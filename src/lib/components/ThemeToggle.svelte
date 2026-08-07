<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { theme } from '../stores/theme.svelte';
  import { bayerOrder } from '../actions/bayer';
  import Icon from './Icon.svelte';
  import type { ThemeName } from '../types';

  const COLUMNS = 28;
  const ROWS = 16;
  const TOTAL = COLUMNS * ROWS;
  const HALF = 0.42;

  let busy = $state(false);

  onMount(() => theme.init());

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

  function handleToggle() {
    if (busy) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      theme.toggle();
      return;
    }

    busy = true;
    const target: ThemeName = theme.current === 'pixel' ? 'pixel-light' : 'pixel';

    const overlay = document.createElement('div');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:80',
      'display:grid',
      'pointer-events:none',
      `grid-template-columns:repeat(${COLUMNS},1fr)`,
      `grid-template-rows:repeat(${ROWS},1fr)`,
    ].join(';');

    const background = incomingBackground(target);
    const blocks: HTMLElement[] = [];
    for (let i = 0; i < TOTAL; i += 1) {
      const block = document.createElement('span');
      block.style.cssText = `background:${background};opacity:0`;
      overlay.appendChild(block);
      blocks.push(block);
    }
    document.body.appendChild(overlay);

    const order = bayerOrder(COLUMNS, ROWS);
    const stagger = (index: number) => (order[index] / TOTAL) * HALF;

    gsap.to(blocks, {
      opacity: 1,
      duration: 0.01,
      ease: 'none',
      stagger,
      onComplete: () => {
        theme.toggle();
        gsap.to(blocks, {
          opacity: 0,
          duration: 0.01,
          ease: 'none',
          stagger,
          onComplete: () => {
            overlay.remove();
            busy = false;
          },
        });
      },
    });
  }
</script>

<button
  class="toggle"
  type="button"
  onclick={handleToggle}
  aria-label={theme.current === 'pixel' ? 'Ativar tema claro' : 'Ativar tema escuro'}
  aria-pressed={theme.current === 'pixel-light'}
>
  <Icon name={theme.current === 'pixel' ? 'lampOff' : 'lampOn'} size={16} />
</button>

<style>
  .toggle {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 70;
    display: inline-flex;
    padding: 0.6rem;
    border: 1px solid var(--color-surface-700);
    background: color-mix(in srgb, var(--color-surface-950) 80%, transparent);
    color: var(--color-surface-400);
    cursor: pointer;
    transition:
      color 150ms steps(3, jump-none),
      border-color 150ms steps(3, jump-none);
  }

  .toggle:hover,
  .toggle:focus-visible {
    color: var(--color-primary-500);
    border-color: var(--color-primary-500);
  }
</style>
