<script lang="ts">
  import { certificates } from '../data/certificates';
  import SectionHeading from './SectionHeading.svelte';
</script>

<section id="certificados" class="mx-auto w-full max-w-5xl px-6 py-20">
  <SectionHeading index="03" title="CERTIFICADOS" />

  <ul>
    {#each certificates as cert (cert.link)}
      <li>
        <a
          class="group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-surface-700 px-3 py-4 transition-colors duration-150 ease-[steps(3,jump-none)] hover:bg-surface-900"
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="font-display text-[8px] text-primary-500">{cert.date}</span>
          <span class="flex-1 text-surface-200 group-hover:text-surface-50">{cert.name}</span>
          <span class="text-sm text-surface-500">{cert.institution}</span>
        </a>
      </li>
    {/each}
  </ul>
</section>
