<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';

  interface Props {
    image: string | undefined;
    video: string | undefined;
  }

  let { image, video }: Props = $props();
  let element: HTMLDivElement | undefined = $state();

  const visible = $derived(Boolean(image ?? video));

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

<div bind:this={element} class="preview" class:preview--visible={visible} aria-hidden="true">
  {#if video}
    {#key video}
      <video src={video} autoplay loop muted playsinline></video>
    {/key}
  {:else if image}
    <img src={image} alt="" width="180" />
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

  .preview img,
  .preview video {
    display: block;
    width: 100%;
    height: auto;
    max-height: 300px;
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
