<script lang="ts">
  import { profile } from '../data/profile';
</script>

<section id="hero" class="hero">
  <p class="hero__eyebrow">Portfólio</p>
  <h1 class="hero__name">{profile.name}</h1>
  <p class="hero__role">{profile.role}</p>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 var(--space-4);
  }

  .hero__eyebrow {
    color: var(--color-text-muted);
    margin: 0 0 var(--space-1);
  }

  .hero__name {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 8vw, 5rem);
    margin: 0;
  }

  .hero__role {
    color: var(--color-text-muted);
    font-size: 1.25rem;
  }
</style>
