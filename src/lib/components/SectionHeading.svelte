<script lang="ts">
  interface Props {
    index: string;
    title: string;
    meta?: string;
  }

  let { index, title, meta }: Props = $props();
</script>

<div class="section-heading">
  <span class="section-heading__index">{index}</span>
  <h2 class="section-heading__title">{title}</h2>
  <span class="section-heading__line" aria-hidden="true"></span>
  {#if meta}
    <span class="section-heading__meta">{meta}</span>
  {/if}
</div>

<style>
  .section-heading {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3.5rem;
  }

  .section-heading__index,
  .section-heading__title,
  .section-heading__meta {
    font-family: var(--font-display);
    text-shadow: var(--display-emboss);
    white-space: nowrap;
  }

  .section-heading__index {
    font-size: 8px;
    color: var(--color-primary-500);
  }

  .section-heading__title {
    font-size: 16px;
    letter-spacing: 0.06em;
    color: var(--color-surface-50);
  }

  .section-heading__line {
    height: 1px;
    flex: 1;
    background: repeating-linear-gradient(
      90deg,
      var(--color-surface-700) 0 8px,
      transparent 8px 16px
    );
    transform-origin: left;
  }

  .section-heading__meta {
    font-size: 8px;
    letter-spacing: 0.14em;
    color: var(--color-surface-500);
  }

  @supports (animation-timeline: view()) {
    .section-heading__line {
      animation: resolve-line linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 32%;
    }
  }

  @keyframes resolve-line {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }

  @media (max-width: 639px) {
    .section-heading {
      margin-bottom: 2.5rem;
    }

    .section-heading__meta {
      display: none;
    }
  }
</style>
