<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';

  interface Props {
    source: string | undefined;
  }

  let { source }: Props = $props();
  let element: HTMLDivElement | undefined = $state();

  function handleMove(event: PointerEvent) {
    if (!element) return;
    gsap.to(element, {
      y: event.clientY - 130,
      duration: 0.35,
      ease: 'steps(5)',
      overwrite: true,
    });
  }

  onMount(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    window.addEventListener('pointermove', handleMove);
  });

  onDestroy(() => {
    window.removeEventListener('pointermove', handleMove);
  });
</script>

<div
  bind:this={element}
  class="preview"
  class:preview--visible={Boolean(source)}
  aria-hidden="true"
>
  {#if source}
    <img src={source} alt="" width="180" />
  {/if}
</div>

<style>
  .preview {
    position: fixed;
    top: 0;
    right: max(2rem, calc(50vw - 34rem));
    z-index: 40;
    width: 180px;
    pointer-events: none;
    border: 1px solid var(--color-primary-500);
    background: var(--color-surface-950);
    opacity: 0;
    transition: opacity 120ms steps(3, jump-none);
  }

  .preview--visible {
    opacity: 1;
  }

  .preview img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 260px;
    object-fit: cover;
    object-position: top;
    image-rendering: pixelated;
  }

  @media (prefers-reduced-motion: reduce) {
    .preview {
      display: none;
    }
  }

  @media (pointer: coarse) {
    .preview {
      display: none;
    }
  }
</style>
