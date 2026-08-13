<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    image?: string;
    video?: string;
    title: string;
    index: number;
    total: number;
    previewLabel: string;
    loopLabel: string;
    compact?: boolean;
  }

  let {
    image,
    video,
    title,
    index,
    total,
    previewLabel,
    loopLabel,
    compact = false,
  }: Props = $props();

  let element: HTMLDivElement | undefined = $state();
  let videoElement: HTMLVideoElement | undefined = $state();
  let visible = $state(false);

  $effect(() => {
    if (!videoElement) return;
    if (visible) void videoElement.play().catch(() => undefined);
    else videoElement.pause();
  });

  onMount(() => {
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { rootMargin: '120px 0px', threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  });
</script>

<div bind:this={element} class="visual" class:visual--compact={compact} aria-hidden="true">
  <div class="visual__bar">
    <span>{previewLabel}</span>
    <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
  </div>

  <div class="visual__screen">
    {#key video ?? image ?? title}
      <div class="visual__media">
        {#if video}
        <video bind:this={videoElement} src={video} preload="metadata" loop muted playsinline></video>
        {:else if image}
          <img src={image} alt="" />
        {:else}
          <div class="visual__fallback">
            <span>REST / API</span>
            <strong>{title}</strong>
            <span>JWT · TYPEORM · POSTGRESQL</span>
          </div>
        {/if}
      </div>
    {/key}
    <span class="visual__scan" aria-hidden="true"></span>
  </div>

  <div class="visual__bar visual__bar--bottom">
    <span>{title}</span>
    <span class="visual__status">{loopLabel}</span>
  </div>
</div>

<style>
  .visual {
    width: 21rem;
    border: 1px solid var(--color-surface-700);
    border-right: 4px solid color-mix(in srgb, var(--color-primary-500) 30%, var(--color-surface-700));
    border-bottom: 4px solid color-mix(in srgb, var(--color-primary-500) 30%, var(--color-surface-700));
    background: var(--color-surface-950);
  }

  .visual__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 2.25rem;
    padding: 0 0.75rem;
    border-bottom: 1px solid var(--color-surface-700);
    font-family: var(--font-display);
    text-shadow: var(--display-emboss);
    font-size: 8px;
    letter-spacing: 0.1em;
    color: var(--color-surface-500);
  }

  .visual__bar--bottom {
    border-top: 1px solid var(--color-surface-700);
    border-bottom: 0;
    color: var(--color-surface-300);
  }

  .visual__status {
    color: var(--color-primary-500);
  }

  .visual__screen {
    position: relative;
    height: 29rem;
    overflow: hidden;
    background:
      linear-gradient(var(--color-surface-900) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-surface-900) 1px, transparent 1px),
      var(--color-surface-950);
    background-size: 16px 16px;
  }

  .visual img,
  .visual video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    image-rendering: pixelated;
  }

  .visual__media {
    width: 100%;
    height: 100%;
    animation: resolve-media 320ms steps(8, jump-none) both;
  }

  .visual__scan {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0 3px,
      color-mix(in srgb, var(--color-surface-950) 28%, transparent) 3px 4px
    );
  }

  .visual__fallback {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem;
    font-family: var(--font-display);
    text-shadow: var(--display-emboss);
    font-size: 8px;
    color: var(--color-primary-500);
  }

  .visual__fallback strong {
    max-width: 16rem;
    font-size: 24px;
    line-height: 1.25;
    color: var(--color-surface-50);
  }

  .visual--compact {
    width: 100%;
    margin-top: 1.5rem;
  }

  .visual--compact .visual__screen {
    height: min(64vw, 19rem);
  }

  @keyframes resolve-media {
    from {
      clip-path: inset(0 0 100% 0);
    }
    to {
      clip-path: inset(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .visual__media {
      animation: none;
    }

    .visual__scan {
      display: none;
    }
  }
</style>
