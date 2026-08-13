<script lang="ts">
  import { socialLinks, profile } from '../data/profile';
  import { ui } from '../data/ui';
  import { t } from '../stores/language.svelte';
  import Icon from './Icon.svelte';
  import SectionHeading from './SectionHeading.svelte';
</script>

<section id="contato" class="section-frame contact-section" data-section="04">
  <div class="contact-shell">
    <SectionHeading index="04" title={t(ui.contactTitle)} meta={t(ui.contactMeta)} />

    <div class="contact-grid">
      <div class="contact-mark">
        <p>{t(ui.contactLead)}</p>
        <span aria-hidden="true">BS</span>
      </div>

      <ul class="links">
        {#each socialLinks as link, index (link.url)}
          <li>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <span class="links__index" aria-hidden="true">0{index + 1}</span>
              <span class="links__icon"><Icon name={link.icon} size={20} /></span>
              <span class="links__label">{t(link.label)}</span>
              <span class="links__arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <div class="contact-end">
      <span>{profile.name.toUpperCase()} · {new Date().getFullYear()}</span>
      <span>FLORIANÓPOLIS / BR</span>
    </div>
  </div>
</section>

<style>
  .contact-section {
    min-height: 72svh;
  }

  .contact-shell {
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    padding: 8rem 1.5rem 3rem;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: minmax(16rem, 0.85fr) minmax(20rem, 1.15fr);
    align-items: stretch;
    gap: clamp(3rem, 8vw, 7rem);
  }

  .contact-mark {
    display: flex;
    min-height: 18rem;
    flex-direction: column;
    justify-content: space-between;
    border-left: 1px solid var(--color-surface-700);
    padding-left: 2rem;
  }

  .contact-mark p {
    max-width: 20rem;
    margin: 0;
    font-size: clamp(1.35rem, 2.5vw, 2rem);
    line-height: 1.35;
    color: var(--color-surface-100);
  }

  .contact-mark span {
    font-family: var(--font-display);
    text-shadow: var(--display-emboss);
    font-size: clamp(5rem, 11vw, 8rem);
    line-height: 0.8;
    color: var(--color-primary-500);
  }

  .links {
    display: grid;
    align-content: start;
    gap: 0;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--color-surface-700);
    list-style: none;
  }

  .links a {
    --tone: var(--color-surface-100);
    display: grid;
    grid-template-columns: 1.5rem 1.5rem 1fr 1rem;
    align-items: center;
    gap: 1rem;
    min-height: 5.5rem;
    padding: 1rem;
    border-bottom: 1px solid var(--color-surface-700);
    color: var(--tone);
    text-decoration: none;
    transition: background-color 150ms steps(3, jump-none);
  }

  .links a:hover,
  .links a:focus-visible {
    --tone: var(--color-surface-950);
    background: var(--color-primary-500);
  }

  .links__index {
    font-family: var(--font-display);
    text-shadow: var(--display-emboss);
    font-size: 8px;
    color: var(--color-surface-600);
  }

  .links__icon {
    display: inline-flex;
    color: var(--color-primary-500);
  }

  .links a:hover .links__icon,
  .links a:focus-visible .links__icon,
  .links a:hover .links__index,
  .links a:focus-visible .links__index {
    color: var(--color-surface-950);
  }

  .links__label {
    font-size: 1.25rem;
  }

  .links__arrow {
    opacity: 0.7;
  }

  .contact-end {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 6rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-surface-800);
    font-family: var(--font-display);
    text-shadow: var(--display-emboss);
    font-size: 8px;
    letter-spacing: 0.18em;
    color: var(--color-surface-600);
  }

  @media (max-width: 767px) {
    .contact-shell {
      padding-block: 6rem 2rem;
    }

    .contact-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .contact-mark {
      min-height: 12rem;
      padding-left: 1.25rem;
    }

    .contact-mark span {
      font-size: 5rem;
    }

    .contact-end {
      margin-top: 4rem;
    }

    .contact-end span:last-child {
      display: none;
    }
  }
</style>
