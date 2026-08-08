<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '../stores/theme.svelte';
  import { t } from '../stores/language.svelte';
  import { ui } from '../data/ui';
  import { runThemeToggle } from '../actions/themeTransition';
  import Icon from './Icon.svelte';

  onMount(() => theme.init());
</script>

<button
  class="corner-button"
  type="button"
  onclick={() => runThemeToggle()}
  aria-label={theme.current === 'pixel' ? t(ui.themeToLight) : t(ui.themeToDark)}
  aria-pressed={theme.current === 'pixel-light'}
>
  <Icon name={theme.current === 'pixel' ? 'lampOff' : 'lampOn'} size={16} />
</button>
