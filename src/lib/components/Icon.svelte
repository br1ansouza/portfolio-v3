<script lang="ts">
  import { iconPaths } from '../data/icons';
  import type { SocialIconName } from '../types';

  interface Props {
    name: SocialIconName;
    size?: number;
  }

  let { name, size = 20 }: Props = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d={iconPaths[name]} />
</svg>
