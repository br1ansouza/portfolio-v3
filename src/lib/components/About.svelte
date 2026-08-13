<script lang="ts">
  import { profile, education } from '../data/profile';
  import { techCategories } from '../data/skills';
  import { ui } from '../data/ui';
  import { t } from '../stores/language.svelte';
  import SectionHeading from './SectionHeading.svelte';
</script>

<section id="sobre" class="section-frame" data-section="01">
  <div class="about-shell">
    <SectionHeading index="01" title={t(ui.aboutTitle)} meta={t(ui.aboutMeta)} />

    <div class="about-grid">
      <div class="about-copy">
        {#each profile.bio as paragraph, index (paragraph)}
          <p class:about-lead={index === 0}>{t(paragraph)}</p>
        {/each}
        <span class="about-coordinate" aria-hidden="true">27.5949° S / 48.5482° W</span>
      </div>

      <div class="about-data">
        <ul class="skills-list">
          {#each techCategories as category, index (category.title)}
            <li>
              <span class="data-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span>
                <span class="data-label">{t(category.title).toUpperCase()}</span>
                <span class="data-value">{category.items.join(' · ')}</span>
              </span>
            </li>
          {/each}
        </ul>

        <p class="education-label">{t(ui.educationLabel)}</p>
        <ul class="education-list">
          {#each education as item (item.course)}
            <li>
              {#if item.link}
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <span class="education-course">{t(item.course)}</span>
                  <span class="education-meta">{t(item.institution)} · {item.period}</span>
                </a>
              {:else}
                <div>
                  <span class="education-course">{t(item.course)}</span>
                  <span class="education-meta">{t(item.institution)} · {item.period}</span>
                </div>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>

<style>
  .about-shell {
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    padding: 8rem 1.5rem;
  }

  .about-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(19rem, 1fr);
    align-items: start;
    gap: clamp(3rem, 7vw, 6rem);
  }

  .about-copy {
    position: relative;
    padding: 0.25rem 0 2rem 2rem;
    border-left: 1px solid var(--color-surface-700);
  }

  .about-copy::before {
    content: '';
    position: absolute;
    top: 0;
    left: -2px;
    width: 3px;
    height: 5rem;
    background: var(--color-primary-500);
  }

  .about-copy p {
    margin: 0 0 1.25rem;
    font-size: 1.05rem;
    line-height: 1.75;
    color: var(--color-surface-300);
  }

  .about-copy .about-lead {
    font-size: clamp(1.2rem, 2vw, 1.45rem);
    line-height: 1.55;
    color: var(--color-surface-100);
  }

  .about-coordinate,
  .data-index,
  .data-label,
  .education-label {
    font-family: var(--font-display);
    text-shadow: var(--display-emboss);
    font-size: 8px;
    letter-spacing: 0.16em;
  }

  .about-coordinate {
    display: block;
    margin-top: 2rem;
    color: var(--color-surface-600);
  }

  .skills-list,
  .education-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .skills-list li {
    display: grid;
    grid-template-columns: 1.5rem 1fr;
    gap: 0.75rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-surface-700);
  }

  .skills-list li:first-child {
    padding-top: 0;
  }

  .data-index {
    color: var(--color-surface-600);
  }

  .data-label {
    display: block;
    color: var(--color-primary-500);
  }

  .data-value {
    display: block;
    margin-top: 0.5rem;
    color: var(--color-surface-300);
  }

  .education-label {
    margin: 3.5rem 0 1rem;
    color: var(--color-primary-500);
  }

  .education-list li {
    border-top: 1px solid var(--color-surface-700);
    padding: 0.875rem 0;
  }

  .education-list a,
  .education-list div {
    display: block;
  }

  .education-course,
  .education-meta {
    display: block;
  }

  .education-course {
    color: var(--color-surface-100);
  }

  .education-list a:hover .education-course {
    color: var(--color-primary-500);
  }

  .education-meta {
    margin-top: 0.3rem;
    font-size: 0.875rem;
    color: var(--color-surface-500);
  }

  @media (max-width: 767px) {
    .about-shell {
      padding-block: 6rem;
    }

    .about-grid {
      grid-template-columns: 1fr;
      gap: 4rem;
    }

    .about-copy {
      padding-left: 1.25rem;
    }
  }
</style>
