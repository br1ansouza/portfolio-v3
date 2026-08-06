<script lang="ts">
  import type { Project } from '../types';

  interface Props {
    project: Project;
  }

  let { project }: Props = $props();
</script>

<article class="project-card">
  <h3>{project.title}</h3>
  <p>{project.description}</p>
  <ul class="project-card__tech">
    {#each project.technologies as tech (tech)}
      <li>{tech}</li>
    {/each}
  </ul>
  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
</article>

<style>
  .project-card {
    border: 1px solid var(--color-border);
    padding: var(--space-3);
  }

  .project-card__tech {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
    list-style: none;
    margin: 0 0 var(--space-2);
    padding: 0;
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }

  .project-card__tech li::after {
    content: ' ·';
  }

  .project-card__tech li:last-child::after {
    content: '';
  }
</style>
