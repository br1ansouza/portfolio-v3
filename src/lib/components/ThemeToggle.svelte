<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '../stores/theme.svelte';
  import { t } from '../stores/language.svelte';
  import { ui } from '../data/ui';
  import { ditherWipe } from '../actions/ditherWipe';
  import Icon from './Icon.svelte';
  import type { ThemeName } from '../types';

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

  async function handleToggle() {
    if (busy) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      theme.toggle();
      return;
    }

    busy = true;
    const target: ThemeName = theme.current === 'pixel' ? 'pixel-light' : 'pixel';
    await ditherWipe(incomingBackground(target), () => theme.toggle());
    busy = false;
  }
</script>

<button
  class="corner-button"
  type="button"
  onclick={handleToggle}
  aria-label={theme.current === 'pixel' ? t(ui.themeToLight) : t(ui.themeToDark)}
  aria-pressed={theme.current === 'pixel-light'}
>
  <Icon name={theme.current === 'pixel' ? 'lampOff' : 'lampOn'} size={16} />
</button>
