<script lang="ts">
  import { profile } from '../data/profile';
  import { ui } from '../data/ui';
  import { letterPush } from '../actions/letterPush';
  import DitherField from './DitherField.svelte';
  import { theme } from '../stores/theme.svelte';
  import { t } from '../stores/language.svelte';

  interface Props {
    scroll?: number;
  }

  let { scroll = 0 }: Props = $props();
</script>

<section id="hero" class="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden">
  <DitherField {scroll} theme={theme.current} />

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
