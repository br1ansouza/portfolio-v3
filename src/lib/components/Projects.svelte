<script lang="ts">
  import { projects } from '../data/projects';
  import { ui } from '../data/ui';
  import type { Project } from '../types';
  import { t } from '../stores/language.svelte';
  import { pixelReveal } from '../actions/pixelReveal';
  import SectionHeading from './SectionHeading.svelte';
  import ProjectPreview from './ProjectPreview.svelte';

  let hovered: Project | undefined = $state();
</script>

<ProjectPreview image={hovered?.image} video={hovered?.video} />

<section id="projetos" class="mx-auto w-full max-w-5xl px-6 py-20">
  <SectionHeading index="02" title={t(ui.projectsTitle)} />

  <ul use:pixelReveal={{ columns: 20, rows: 12, duration: 1 }}>
    {#each projects as project, index (project.slug)}
      <li class="relative border-b border-surface-700">
        <a
          class="group grid grid-cols-[2rem_1fr_1.5rem] items-baseline gap-x-4 px-3 py-6 transition-colors duration-150 ease-[steps(3,jump-none)] hover:bg-primary-500"
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onpointerenter={() => (hovered = project)}
          onpointerleave={() => (hovered = undefined)}
          onfocus={() => (hovered = project)}
          onblur={() => (hovered = undefined)}
        >
          <span
            class="font-display text-[8px] text-surface-500 group-hover:text-surface-950"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <span class="min-w-0">
            <span class="font-display block text-[16px] text-surface-50 group-hover:text-surface-950">
              {t(project.title)}
            </span>
            <span class="mt-2 block text-surface-400 group-hover:text-surface-900">
              {t(project.description)}
            </span>
            <span class="mt-3 block font-mono text-xs text-surface-500 group-hover:text-surface-800">
              {project.technologies.join('  ')}
            </span>
          </span>

          <span
            class="font-display text-[16px] text-surface-600 transition-transform duration-150 ease-[steps(3,jump-none)] group-hover:translate-x-1 group-hover:text-surface-950"
            aria-hidden="true"
          >
            →
          </span>
        </a>

        {#if project.liveUrl}
          <a
            class="absolute bottom-6 right-3 font-mono text-xs text-primary-500 underline-offset-4 hover:underline"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(ui.projectsPlay)}
          </a>
        {/if}
      </li>
    {/each}
  </ul>

  <p class="mt-6 px-3 text-sm text-surface-500">
    {t(ui.projectsMore)}
    <a
      class="text-primary-500 underline-offset-4 hover:underline"
      href="https://github.com/br1ansouza"
      target="_blank"
      rel="noopener noreferrer">github.com/br1ansouza</a
    >
  </p>
</section>
