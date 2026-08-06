<script lang="ts">
  import { profile } from '../data/profile';
  import { techCategories } from '../data/skills';
</script>

<section id="sobre" class="about">
  <h2>Sobre</h2>

  {#each profile.bio as paragraph (paragraph)}
    <p>{paragraph}</p>
  {/each}

  <ul class="about__skills">
    {#each techCategories as category (category.title)}
      <li>
        <h3>{category.title}</h3>
        <p>{category.items.join(' · ')}</p>
      </li>
    {/each}
  </ul>
</section>

<style>
  .about {
    padding: var(--space-6) var(--space-4);
  }

  .about__skills {
    list-style: none;
    margin: var(--space-4) 0 0;
    padding: 0;
    display: grid;
    gap: var(--space-3);
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  .about__skills h3 {
    margin: 0 0 var(--space-1);
    font-size: 1rem;
  }

  .about__skills p {
    margin: 0;
    color: var(--color-text-muted);
  }
</style>
