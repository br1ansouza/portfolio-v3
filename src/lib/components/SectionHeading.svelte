<script lang="ts">
  interface Props {
    index: string;
    title: string;
  }

  let { index, title }: Props = $props();
</script>

<div class="mb-8 flex items-baseline gap-4">
  <span class="font-display text-[8px] text-primary-500">{index}</span>
  <h2 class="font-display text-[16px] tracking-wide text-surface-50">{title}</h2>
</div>
