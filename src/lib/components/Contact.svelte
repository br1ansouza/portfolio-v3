<script lang="ts">
  import { socialLinks } from '../data/profile';
  import Icon from './Icon.svelte';
</script>

<section id="contato" class="contact">
  <h2>Contato</h2>
  <ul>
    {#each socialLinks as link (link.url)}
      <li>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          <Icon name={link.icon} />
          <span>{link.label}</span>
        </a>
      </li>
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

  .contact a {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    text-decoration: none;
  }
</style>
