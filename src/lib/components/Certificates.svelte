<script lang="ts">
  import { certificates } from '../data/certificates';
  import { infiniteMarquee } from '../actions/infiniteMarquee';
  import SectionHeading from './SectionHeading.svelte';
  import Icon from './Icon.svelte';

  let track: HTMLElement | undefined = $state();

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
    use:infiniteMarquee={{ track, count: certificates.length }}
  >
    <ul bind:this={track} class="track">
      {#each loop as cert, index (index)}
        {@const latest = index % certificates.length === 0}
        <li>
          <a
            class="group flex h-44 w-60 shrink-0 flex-col justify-between border p-4 transition-colors duration-150 ease-[steps(3,jump-none)] hover:bg-primary-500 {latest
              ? 'border-primary-500'
              : 'border-surface-700'}"
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            tabindex={index < certificates.length ? 0 : -1}
            aria-hidden={index >= certificates.length}
          >
            <span class="font-display text-[16px] text-primary-500 group-hover:text-surface-950">
              {cert.date}
            </span>

            <span class="text-[0.95rem] leading-snug text-surface-100 group-hover:text-surface-950">
              {cert.name}
            </span>

            <span
              class="flex items-center justify-between text-xs text-surface-500 group-hover:text-surface-800"
            >
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
