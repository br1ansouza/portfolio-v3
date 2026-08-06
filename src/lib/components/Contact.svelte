<script lang="ts">
  import { socialLinks } from '../data/profile';
</script>

<section id="contato" class="contact">
  <h2>Contato</h2>
  <ul>
    {#each socialLinks as link (link.url)}
      <li><a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a></li>
    {/each}
  </ul>
</section>

<style>
  .contact {
    padding: var(--space-6) var(--space-4);
  }

  .contact ul {
    list-style: none;
    margin: var(--space-4) 0 0;
    padding: 0;
    display: flex;
    gap: var(--space-4);
  }
</style>
