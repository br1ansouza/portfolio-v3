<script lang="ts">
  import { certificates } from '../data/certificates';
  import { ui } from '../data/ui';
  import { t } from '../stores/language.svelte';
  import { infiniteMarquee } from '../actions/infiniteMarquee';
  import SectionHeading from './SectionHeading.svelte';
  import Icon from './Icon.svelte';

  let track: HTMLElement | undefined = $state();
  let activeIndex = $state(-1);

  const loop = [...certificates, ...certificates];
</script>

<section id="certificados" class="section-frame certificates-section" data-section="03">
  <div class="certificates-heading">
    <SectionHeading index="03" title={t(ui.certificatesTitle)} meta={t(ui.certificatesMeta)} />
    <span class="nudge" title={t(ui.certificatesHint)} aria-hidden="true">
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
        {@const position = (index % certificates.length) + 1}
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
            <span class="card__top">
              <span class="card__year">{cert.date}</span>
              <span class="card__index">CERT / {String(position).padStart(2, '0')}</span>
            </span>
            <span class="card__name">{t(cert.name)}</span>
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
  .certificates-section {
    padding-block: 8rem;
    overflow: hidden;
  }

  .certificates-heading {
    display: flex;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    align-items: center;
    gap: 1rem;
    padding-inline: 1.5rem;
  }

  .certificates-heading :global(.section-heading) {
    flex: 1;
  }

  .viewport {
    overflow: hidden;
    padding: 2rem max(1.5rem, calc(50vw - 32rem));
    border-top: 1px solid var(--color-surface-800);
    border-bottom: 1px solid var(--color-surface-800);
    background: color-mix(in srgb, var(--color-surface-900) 42%, transparent);
    cursor: ew-resize;
    touch-action: pan-y;
  }

  .track {
    display: flex;
    gap: 1rem;
    width: max-content;
    margin: 0;
    padding: 0;
    list-style: none;
    will-change: transform;
    user-select: none;
  }

  .card {
    --card-year: var(--color-primary-500);
    --card-name: var(--color-surface-100);
    --card-meta: var(--color-surface-500);
    --card-bg: transparent;

    position: relative;
    display: flex;
    width: 15rem;
    height: 11rem;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    padding: 1rem;
    border: 1px solid var(--color-surface-700);
    background: var(--card-bg);
    text-decoration: none;
    transition: background-color 150ms steps(3, jump-none);
  }

  .card::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 3px;
    background: repeating-linear-gradient(
      90deg,
      var(--color-primary-500) 0 8px,
      transparent 8px 12px
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 180ms steps(4, jump-none);
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

  .card[data-active]::after,
  .card:focus-visible::after,
  .card--latest::after {
    transform: scaleX(1);
  }

  .card__top,
  .card__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .card__year,
  .card__index {
    font-family: var(--font-display);
    text-shadow: var(--display-emboss);
  }

  .card__year {
    font-size: 16px;
    color: var(--card-year);
  }

  .card__index {
    font-size: 8px;
    color: var(--card-meta);
  }

  .card__name {
    font-size: 0.95rem;
    line-height: 1.375;
    color: var(--card-name);
  }

  .card__meta {
    font-size: 0.75rem;
    color: var(--card-meta);
  }

  .nudge {
    display: inline-flex;
    margin-top: -3.5rem;
    color: var(--color-primary-500);
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

  @media (max-width: 639px) {
    .certificates-section {
      padding-block: 6rem;
    }

    .viewport {
      padding-block: 1.5rem;
    }
  }
</style>
