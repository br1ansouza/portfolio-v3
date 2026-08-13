<script lang="ts">
  import { profile } from '../data/profile';
  import { ui } from '../data/ui';
  import { letterPush } from '../actions/letterPush';
  import { runThemeToggle } from '../actions/themeTransition';
  import { HIDDEN, sphereHit } from '../actions/heroSphere';
  import type { SphereRect } from '../actions/heroSphere';
  import { onMount } from 'svelte';
  import DitherField from './DitherField.svelte';
  import { theme } from '../stores/theme.svelte';
  import { t } from '../stores/language.svelte';

  interface Props {
    scroll?: number;
    onSphereAvailable?: (available: boolean) => void;
  }

  let { scroll = 0, onSphereAvailable }: Props = $props();

  let field: ReturnType<typeof DitherField> | undefined = $state();
  let sphere: SphereRect = $state(HIDDEN);
  let hovered = $state(false);

  const hit = $derived(sphereHit(sphere));

  function handleSphereClick() {
    runThemeToggle(() => field?.pulse());
  }

  function handleSphereFocus(event: FocusEvent & { currentTarget: HTMLButtonElement }) {
    hovered = event.currentTarget.matches(':focus-visible');
  }

  onMount(() => {
    const release = () => (hovered = false);
    document.addEventListener('visibilitychange', release);
    window.addEventListener('blur', release);
    return () => {
      document.removeEventListener('visibilitychange', release);
      window.removeEventListener('blur', release);
    };
  });
</script>

<section id="hero" class="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden">
  <DitherField
    bind:this={field}
    {scroll}
    {hovered}
    theme={theme.current}
    onSphere={(rect) => {
      sphere = rect;
      onSphereAvailable?.(rect.size > 0);
    }}
  />

  {#if sphere.size > 0}
    <button
      class="sphere"
      type="button"
      style="left:{hit.x}px;top:{hit.y}px;width:{hit.size}px;height:{hit.size}px"
      onclick={handleSphereClick}
      onpointerenter={() => (hovered = true)}
      onpointerleave={() => (hovered = false)}
      onfocus={handleSphereFocus}
      onblur={() => (hovered = false)}
      aria-label={theme.current === 'pixel' ? t(ui.themeToLight) : t(ui.themeToDark)}
      aria-pressed={theme.current === 'pixel-light'}
    ></button>
    <span
      class="sphere-caption"
      class:sphere-caption--active={hovered}
      style="left:{sphere.x + sphere.size / 2}px;top:{sphere.y + sphere.size + 10}px"
      aria-hidden="true"
    >THEME / CLICK</span>
  {/if}

  <div class="relative z-1 mx-auto w-full max-w-5xl px-6">
    <p class="font-display text-[8px] tracking-[0.35em] text-primary-500">{t(ui.heroLabel)}</p>

    <h1
      class="font-display mt-5 text-[clamp(2rem,9vw,5.5rem)] leading-[1.06] text-surface-50"
      use:letterPush={profile.name}
    >{profile.name}</h1>

    <div class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-surface-100">
      <span>{t(profile.role)}</span>
      <span class="hidden text-primary-500 sm:inline">/</span>
      <span>{t(profile.location)}</span>
    </div>
  </div>

  <div
    class="absolute bottom-8 left-1/2 z-1 -translate-x-1/2 font-display text-[8px] tracking-[0.3em] text-surface-500"
    aria-hidden="true"
  >
    <span class="blink">▼</span>
  </div>

  <div class="hero-system" aria-hidden="true">
    <span>WEBGL2 / GLSL / BAYER 4×4</span>
    <span>00 / 04</span>
  </div>
</section>

<style>
  .sphere {
    position: absolute;
    z-index: 1;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: crosshair;
  }

  .sphere::after {
    content: '';
    position: absolute;
    inset: -8px;
    border: 1px solid var(--color-primary-500);
    opacity: 0;
    transition: opacity 150ms steps(3, jump-none);
  }

  .sphere:hover::after,
  .sphere:focus-visible::after {
    opacity: 0.65;
  }

  .sphere-caption {
    position: absolute;
    z-index: 2;
    transform: translateX(-50%);
    font-family: var(--font-display);
    text-shadow: var(--display-emboss);
    font-size: 8px;
    letter-spacing: 0.12em;
    white-space: nowrap;
    color: var(--color-surface-600);
    pointer-events: none;
    transition: color 150ms steps(3, jump-none);
  }

  .sphere-caption--active {
    color: var(--color-primary-500);
  }

  .hero-system {
    position: absolute;
    right: max(1.5rem, calc(50vw - 32rem));
    bottom: 2rem;
    left: max(1.5rem, calc(50vw - 32rem));
    z-index: 1;
    display: flex;
    justify-content: space-between;
    font-family: var(--font-display);
    text-shadow: var(--display-emboss);
    font-size: 8px;
    letter-spacing: 0.14em;
    color: var(--color-surface-600);
  }

  .blink {
    animation: blink 1.4s steps(2, jump-none) infinite;
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0.15;
    }
  }

  @media (max-width: 639px) {
    .hero-system {
      display: none;
    }
  }
</style>
