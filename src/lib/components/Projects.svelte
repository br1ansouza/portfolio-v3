<script lang="ts">
  import { projects } from '../data/projects';
  import ProjectCard from './ProjectCard.svelte';
</script>

<section id="projetos" class="projects">
  <h2>Projetos</h2>
  <div class="projects__grid">
    {#each projects as project (project.slug)}
      <ProjectCard {project} />
    {/each}
  </div>
</section>

<style>
  .projects {
    padding: var(--space-6) var(--space-4);
  }

  .projects__grid {
    display: grid;
    gap: var(--space-3);
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    margin-top: var(--space-4);
  }
</style>
