<script lang="ts">
  import { profile, education } from '../data/profile';
  import { techCategories } from '../data/skills';
  import { ui } from '../data/ui';
  import { t } from '../stores/language.svelte';
  import SectionHeading from './SectionHeading.svelte';
</script>

<section id="sobre" class="mx-auto w-full max-w-5xl px-6 py-20">
  <SectionHeading index="01" title={t(ui.aboutTitle)} />

  <div class="grid items-start gap-x-16 gap-y-12 md:grid-cols-[1.1fr_1fr]">
    <div class="space-y-5 text-lg leading-relaxed text-surface-200">
      {#each profile.bio as paragraph (paragraph)}
        <p>{t(paragraph)}</p>
      {/each}
    </div>

    <div>
      <ul>
        {#each techCategories as category (category.title)}
          <li class="border-b border-surface-700 py-4 first:pt-0">
            <p class="font-display text-[8px] tracking-[0.2em] text-primary-500">
              {t(category.title).toUpperCase()}
            </p>
            <p class="mt-2 text-surface-300">{category.items.join(' · ')}</p>
          </li>
        {/each}
      </ul>

      <p class="font-display mt-10 mb-4 text-[8px] tracking-[0.2em] text-primary-500">
        {t(ui.educationLabel)}
      </p>
      <ul>
        {#each education as item (item.course)}
          <li class="border-t border-surface-700 py-3">
            {#if item.link}
              <a class="group block" href={item.link} target="_blank" rel="noopener noreferrer">
                <span class="block text-surface-100 group-hover:text-primary-500">
                  {t(item.course)}
                </span>
                <span class="mt-1 block text-sm text-surface-500">
                  {t(item.institution)} · {item.period}
                </span>
              </a>
            {:else}
              <div>
                <span class="block text-surface-100">{t(item.course)}</span>
                <span class="mt-1 block text-sm text-surface-500">
                  {t(item.institution)} · {item.period}
                </span>
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>
