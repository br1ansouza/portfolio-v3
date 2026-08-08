<script lang="ts">
  import { socialLinks, profile } from '../data/profile';
  import { ui } from '../data/ui';
  import { t } from '../stores/language.svelte';
  import Icon from './Icon.svelte';
  import SectionHeading from './SectionHeading.svelte';
</script>

<section id="contato" class="mx-auto w-full max-w-5xl px-6 py-20">
  <SectionHeading index="04" title={t(ui.contactTitle)} />

  <ul class="links">
    {#each socialLinks as link (link.url)}
      <li>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          <span class="links__icon"><Icon name={link.icon} size={18} /></span>
          <span class="links__label">{t(link.label)}</span>
          <span class="links__arrow" aria-hidden="true">↗</span>
        </a>
      </li>
    {/each}
  </ul>

  <p class="signature">
    {profile.name.toUpperCase()} · {new Date().getFullYear()}
  </p>
</section>

<style>
  .links {
    display: grid;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (min-width: 640px) {
    .links {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .links a {
    --tone: var(--color-surface-100);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.1rem 1.25rem;
    border: 1px solid var(--color-surface-700);
    color: var(--tone);
    font-size: 1.05rem;
    text-decoration: none;
    transition: background-color 150ms steps(3, jump-none);
  }

  .links a:hover,
  .links a:focus-visible {
    --tone: var(--color-surface-950);
    background: var(--color-primary-500);
  }

  .links__icon {
    display: inline-flex;
    color: var(--color-primary-500);
  }

  .links a:hover .links__icon,
  .links a:focus-visible .links__icon {
    color: var(--color-surface-950);
  }

  .links__label {
    flex: 1;
  }

  .links__arrow {
    font-size: 0.85rem;
    opacity: 0.7;
  }

  .signature {
    margin-top: 4rem;
    font-family: var(--font-display);
    font-size: 8px;
    letter-spacing: 0.25em;
    color: var(--color-surface-600);
  }
</style>
