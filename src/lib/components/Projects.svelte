<script lang="ts">
  import { onMount } from 'svelte';
  import { projects } from '../data/projects';
  import { ui } from '../data/ui';
  import { t } from '../stores/language.svelte';
  import { pixelReveal } from '../actions/pixelReveal';
  import SectionHeading from './SectionHeading.svelte';
  import ProjectPreview from './ProjectPreview.svelte';

  let activeIndex = $state(0);
  let compact = $state(false);

  const activeProject = $derived(projects[activeIndex] ?? projects[0]);

  onMount(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => (compact = query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  });
</script>

<section id="projetos" class="section-frame" data-section="02">
  <div class="projects-shell">
    <SectionHeading index="02" title={t(ui.projectsTitle)} meta={t(ui.projectsMeta)} />

    <div class="projects-layout">
      <ul class="projects-list" use:pixelReveal={{ columns: 18, rows: 12, duration: 0.8 }}>
        {#each projects as project, index (project.slug)}
          <li class:project-active={index === activeIndex}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onpointerenter={() => (activeIndex = index)}
              onfocus={() => (activeIndex = index)}
            >
              <span class="project-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span class="project-copy">
                <span class="project-title">{t(project.title)}</span>
                <span class="project-description">{t(project.description)}</span>
                <span class="project-tech">{project.technologies.join('  ')}</span>

                {#if compact && index < 3}
                  <ProjectPreview
                    image={project.image}
                    video={project.video}
                    title={t(project.title)}
                    {index}
                    total={projects.length}
                    previewLabel={t(ui.projectPreview)}
                    loopLabel={t(ui.projectLoop)}
                    compact
                  />
                {/if}
              </span>

              <span class="project-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        {/each}
      </ul>

      {#if !compact}
        <aside class="projects-stage">
          <ProjectPreview
            image={activeProject.image}
            video={activeProject.video}
            title={t(activeProject.title)}
            index={activeIndex}
            total={projects.length}
            previewLabel={t(ui.projectPreview)}
            loopLabel={t(ui.projectLoop)}
          />
        </aside>
      {/if}
    </div>

    <p class="projects-more">
      {t(ui.projectsMore)}
      <a href="https://github.com/br1ansouza" target="_blank" rel="noopener noreferrer">
        github.com/br1ansouza
      </a>
    </p>
  </div>
</section>

<style>
  .projects-shell {
    width: 100%;
    max-width: 72rem;
    margin: 0 auto;
    padding: 8rem 1.5rem;
  }

  .projects-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 21rem;
    align-items: start;
    gap: clamp(3rem, 7vw, 7rem);
  }

  .projects-list {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--color-surface-700);
  }

  .projects-list li {
    position: relative;
    border-bottom: 1px solid var(--color-surface-700);
  }

  .projects-list li::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 2px;
    background: var(--color-primary-500);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 180ms steps(4, jump-none);
  }

  .projects-list li.project-active::before {
    transform: scaleY(1);
  }

  .projects-list a {
    display: grid;
    grid-template-columns: 2rem minmax(0, 1fr) 1.5rem;
    align-items: baseline;
    gap: 1rem;
    padding: 1.75rem 1rem;
    color: inherit;
    text-decoration: none;
    transition: background-color 150ms steps(3, jump-none);
  }

  .projects-list a:hover,
  .projects-list a:focus-visible {
    background: color-mix(in srgb, var(--color-primary-500) 12%, transparent);
  }

  .project-index,
  .project-title {
    font-family: var(--font-display);
    text-shadow: var(--display-emboss);
  }

  .project-index {
    font-size: 8px;
    color: var(--color-surface-500);
  }

  .project-title {
    display: block;
    font-size: 16px;
    color: var(--color-surface-50);
  }

  .project-description {
    display: block;
    margin-top: 0.75rem;
    line-height: 1.6;
    color: var(--color-surface-300);
  }

  .project-tech {
    display: block;
    margin-top: 0.875rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.75rem;
    line-height: 1.6;
    color: var(--color-surface-500);
  }

  .project-arrow {
    color: var(--color-surface-600);
  }

  .project-active .project-title,
  .project-active .project-arrow {
    color: var(--color-primary-500);
  }

  .projects-stage {
    position: sticky;
    top: 5rem;
  }

  .projects-more {
    margin: 2rem 0 0;
    padding-left: 3rem;
    font-size: 0.875rem;
    color: var(--color-surface-500);
  }

  .projects-more a {
    color: var(--color-primary-500);
    text-underline-offset: 4px;
  }

  .projects-more a:hover {
    text-decoration: underline;
  }

  @media (max-width: 767px) {
    .projects-shell {
      padding-block: 6rem;
    }

    .projects-layout {
      display: block;
    }

    .projects-list a {
      grid-template-columns: 1.5rem minmax(0, 1fr) 1rem;
      gap: 0.75rem;
      padding: 1.75rem 0;
    }

    .project-description {
      font-size: 1rem;
      line-height: 1.55;
    }

    .projects-more {
      padding-left: 0;
    }
  }
</style>
