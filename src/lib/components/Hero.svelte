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
  }

  let { scroll = 0 }: Props = $props();

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
    onSphere={(rect) => (sphere = rect)}
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
  {/if}

  <div class="relative z-1 mx-auto w-full max-w-5xl px-6">
    <p class="font-display text-[8px] tracking-[0.35em] text-primary-500">{t(ui.heroLabel)}</p>

    <h1
      class="font-display mt-5 text-[clamp(2rem,9vw,5.5rem)] leading-[1.06] text-surface-50"
      use:letterPush={profile.name}
    >{profile.name}</h1>

    <div class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-surface-100">
      <span>{t(profile.role)}</span>
      <span class="text-primary-500">/</span>
      <span>{t(profile.location)}</span>
    </div>
  </div>

  <div
    class="absolute bottom-8 left-1/2 z-1 -translate-x-1/2 font-display text-[8px] tracking-[0.3em] text-surface-500"
    aria-hidden="true"
  >
    <span class="blink">▼</span>
  </div>
</section>

<style>
  .sphere {
    position: absolute;
    z-index: 1;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: none;
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
</style>
