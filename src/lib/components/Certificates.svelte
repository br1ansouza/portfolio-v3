<script lang="ts">
  import { certificates } from '../data/certificates';
</script>

<section id="certificados" class="certificates">
  <h2>Certificados</h2>
  <ul>
    {#each certificates as cert (cert.link)}
      <li>
        <a href={cert.link} target="_blank" rel="noopener noreferrer">
          {cert.name} — {cert.institution} ({cert.date})
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  .certificates {
    padding: var(--space-6) var(--space-4);
  }

  .certificates ul {
    list-style: none;
    margin: var(--space-4) 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
</style>
