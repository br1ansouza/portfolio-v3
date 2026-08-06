<script lang="ts">
  import { certificates } from '../data/certificates';
  import { infiniteMarquee } from '../actions/infiniteMarquee';
  import SectionHeading from './SectionHeading.svelte';
  import Icon from './Icon.svelte';

  let track: HTMLElement | undefined = $state();
  let activeIndex = $state(-1);

  const loop = [...certificates, ...certificates];
</script>

<section id="certificados" class="py-20">
  <div class="mx-auto flex w-full max-w-5xl items-center gap-4 px-6">
    <SectionHeading index="03" title="CERTIFICADOS" />
    <span class="nudge -mt-8 text-primary-500" title="Role na horizontal" aria-hidden="true">
      <Icon name="scrollX" size={16} />
    </span>
  </div>

  <div
    class="viewport"
    data-lenis-prevent
    use:infiniteMarquee={{
      track,
      count: certificates.length,
      onActive: (index) => (activeIndex = index),
    }}
  >
    <ul bind:this={track} class="track">
      {#each loop as cert, index (index)}
        {@const latest = index % certificates.length === 0}
        <li>
          <a
            class="card {latest ? 'card--latest' : ''}"
            data-card={index}
            data-active={index === activeIndex ? 'true' : undefined}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            tabindex={index < certificates.length ? 0 : -1}
            aria-hidden={index >= certificates.length}
          >
            <span class="card__year">{cert.date}</span>
            <span class="card__name">{cert.name}</span>
            <span class="card__meta">
              <span>{cert.institution}</span>
              <span aria-hidden="true">↗</span>
            </span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .viewport {
    overflow: hidden;
    padding-inline: max(1.5rem, calc(50vw - 32rem));
    cursor: ew-resize;
  }

  .track {
    display: flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
    width: max-content;
    will-change: transform;
  }

  .card {
    --card-year: var(--color-primary-500);
    --card-name: var(--color-surface-100);
    --card-meta: var(--color-surface-500);
    --card-bg: transparent;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 15rem;
    height: 11rem;
    flex-shrink: 0;
    padding: 1rem;
    border: 1px solid var(--color-surface-700);
    background: var(--card-bg);
    text-decoration: none;
    transition: background-color 150ms steps(3, jump-none);
  }

  .card--latest {
    border-color: var(--color-primary-500);
  }

  .card[data-active],
  .card:focus-visible {
    --card-bg: var(--color-primary-500);
    --card-year: var(--color-surface-950);
    --card-name: var(--color-surface-950);
    --card-meta: var(--color-surface-800);
  }

  .card__year {
    font-family: var(--font-display);
    font-size: 16px;
    color: var(--card-year);
  }

  .card__name {
    font-size: 0.95rem;
    line-height: 1.375;
    color: var(--card-name);
  }

  .card__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--card-meta);
  }

  .nudge {
    display: inline-flex;
    animation: nudge 2s steps(3, jump-none) infinite;
  }

  @keyframes nudge {
    0%,
    100% {
      transform: translateX(-3px);
    }
    50% {
      transform: translateX(3px);
    }
  }
</style>
