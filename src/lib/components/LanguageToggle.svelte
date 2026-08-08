<script lang="ts">
  import { onMount } from 'svelte';
  import { language, t } from '../stores/language.svelte';
  import { ui } from '../data/ui';
  import { ditherWipe, currentBackground } from '../actions/ditherWipe';

  let busy = $state(false);

  const target = $derived(language.current === 'en' ? 'PT' : 'EN');

  onMount(() => language.init());

  async function handleToggle() {
    if (busy) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      language.toggle();
      return;
    }

    busy = true;
    await ditherWipe(currentBackground(), () => language.toggle());
    busy = false;
  }
</script>

<button
  class="corner-button"
  type="button"
  onclick={handleToggle}
  aria-label={language.current === 'en' ? t(ui.languageToPt) : t(ui.languageToEn)}
>
  <span class="code">{target}</span>
</button>

<style>
  .code {
    font-family: var(--font-display);
    font-size: 16px;
    line-height: 1;
    -webkit-font-smoothing: none;
  }
</style>
