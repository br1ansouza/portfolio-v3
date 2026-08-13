<script lang="ts">
  import { onMount } from 'svelte';

  const sections = [
    { id: 'hero', label: '00' },
    { id: 'sobre', label: '01' },
    { id: 'projetos', label: '02' },
    { id: 'certificados', label: '03' },
    { id: 'contato', label: '04' },
  ];

  let progress = $state(0);
  let active = $state('00');

  onMount(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      progress = maximum > 0 ? Math.min(Math.max(window.scrollY / maximum, 0), 1) : 0;

      const probe = window.scrollY + window.innerHeight * 0.46;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= probe) active = section.label;
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  });
</script>

<div class="page-meter" aria-hidden="true">
  <span class="page-meter__active">{active}</span>
  <span class="page-meter__rail">
    <span class="page-meter__fill" style:height={`${progress * 100}%`}></span>
  </span>
  <span class="page-meter__end">04</span>
</div>

<style>
  .page-meter {
    position: fixed;
    top: 50%;
    left: 1.5rem;
    z-index: 50;
    display: grid;
    justify-items: center;
    gap: 0.75rem;
    transform: translateY(-50%);
    font-family: var(--font-display);
    text-shadow: var(--display-emboss);
    font-size: 8px;
    color: var(--color-surface-600);
    pointer-events: none;
  }

  .page-meter__active {
    color: var(--color-primary-500);
  }

  .page-meter__rail {
    position: relative;
    display: block;
    width: 1px;
    height: 8rem;
    background: var(--color-surface-700);
  }

  .page-meter__fill {
    position: absolute;
    inset: 0 0 auto;
    display: block;
    background: var(--color-primary-500);
    transition: height 100ms linear;
  }

  @media (max-width: 1199px) {
    .page-meter {
      display: none;
    }
  }
</style>
