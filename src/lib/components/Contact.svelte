<script lang="ts">
  import { socialLinks, profile } from '../data/profile';
  import { ui } from '../data/ui';
  import { t } from '../stores/language.svelte';
  import Icon from './Icon.svelte';
  import SectionHeading from './SectionHeading.svelte';

  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  const email = 'briandesouza1597@gmail.com';
  const links = socialLinks.filter((link) => link.icon !== 'mail');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const field = document.createElement('textarea');
      field.value = email;
      field.style.cssText = 'position:fixed;left:-9999px';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 2000);
  }
</script>

<section id="contato" class="mx-auto w-full max-w-5xl px-6 py-20">
  <SectionHeading index="04" title={t(ui.contactTitle)} />

  <button type="button" class="email" onclick={copyEmail}>
    <span class="email__icon"><Icon name="mail" size={20} /></span>
    <span class="email__address">{email}</span>
    <span class="email__action">{copied ? t(ui.copiedEmail) : t(ui.copyEmail)}</span>
  </button>

  <ul class="links">
    {#each links as link (link.url)}
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
  .email {
    --tone: var(--color-surface-100);
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 1.25rem 1.5rem;
    border: 1px solid var(--color-surface-700);
    background: transparent;
    color: var(--tone);
    font: inherit;
    font-size: 1.15rem;
    text-align: left;
    cursor: pointer;
    transition: background-color 150ms steps(3, jump-none);
  }

  .email:hover,
  .email:focus-visible {
    --tone: var(--color-surface-950);
    background: var(--color-primary-500);
  }

  .email__icon {
    display: inline-flex;
    color: var(--color-primary-500);
  }

  .email:hover .email__icon,
  .email:focus-visible .email__icon {
    color: var(--color-surface-950);
  }

  .email__address {
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .email__action {
    font-family: var(--font-display);
    font-size: 8px;
    letter-spacing: 0.2em;
    color: var(--color-primary-500);
  }

  .email:hover .email__action,
  .email:focus-visible .email__action {
    color: var(--color-surface-950);
  }

  .links {
    display: grid;
    gap: 1rem;
    margin: 1rem 0 0;
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
