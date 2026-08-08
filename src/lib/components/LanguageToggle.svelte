<script lang="ts">
  import { onMount } from 'svelte';
  import { language, t } from '../stores/language.svelte';
  import { ui } from '../data/ui';
  import { ditherWipe, currentBackground } from '../actions/ditherWipe';
  import Icon from './Icon.svelte';

  let busy = $state(false);

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
  <Icon name={language.current === 'en' ? 'flagPt' : 'flagEn'} size={16} />
</button>
