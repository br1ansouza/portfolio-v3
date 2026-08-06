<script lang="ts">
  import { socialLinks } from '../data/profile';
  import Icon from './Icon.svelte';
  import SectionHeading from './SectionHeading.svelte';
</script>

<section id="contato" class="mx-auto w-full max-w-5xl px-6 py-20">
  <SectionHeading index="04" title="CONTATO" />

  <ul class="grid gap-px sm:grid-cols-2">
    {#each socialLinks as link (link.url)}
      <li>
        <a
          class="group flex items-center gap-3 border border-surface-700 px-4 py-5 transition-colors duration-150 ease-[steps(3,jump-none)] hover:bg-primary-500"
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="text-primary-500 group-hover:text-surface-950">
            <Icon name={link.icon} size={16} />
          </span>
          <span class="font-display text-[8px] tracking-[0.2em] text-surface-100 group-hover:text-surface-950">
            {link.label.toUpperCase()}
          </span>
        </a>
      </li>
    {/each}
  </ul>

  <p class="mt-14 font-display text-[8px] tracking-[0.25em] text-surface-600">
    BRIAN SOUZA — {new Date().getFullYear()}
  </p>
</section>
