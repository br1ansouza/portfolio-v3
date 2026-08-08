<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { startSmoothScroll, stopSmoothScroll } from './lib/actions/smoothScroll';
  import type { VelocityListener } from './lib/actions/smoothScroll';
  import Scanlines from './lib/components/Scanlines.svelte';
  import ThemeToggle from './lib/components/ThemeToggle.svelte';
  import LanguageToggle from './lib/components/LanguageToggle.svelte';
  import Hero from './lib/components/Hero.svelte';
  import About from './lib/components/About.svelte';
  import Projects from './lib/components/Projects.svelte';
  import Certificates from './lib/components/Certificates.svelte';
  import Contact from './lib/components/Contact.svelte';
  import { theme } from './lib/stores/theme.svelte';
  import { language } from './lib/stores/language.svelte';

  theme.init();
  language.init();

  let scrollIntensity: number = $state(0);
  let scrollProgress: number = $state(0);
  let sphereAvailable = $state(false);

  const handleVelocity: VelocityListener = (intensity: number) => {
    scrollIntensity = intensity;
    scrollProgress = window.scrollY / Math.max(window.innerHeight, 1);
  };

  onMount(() => {
    startSmoothScroll(handleVelocity);
  });

  onDestroy(() => {
    stopSmoothScroll();
  });
</script>

<div class="corner-controls">
  {#if !sphereAvailable}
    <ThemeToggle />
  {/if}
  <LanguageToggle />
</div>

<Scanlines intensity={scrollIntensity} />

<main>
  <Hero
    scroll={scrollProgress}
    onSphereAvailable={(available) => (sphereAvailable = available)}
  />
  <About />
  <Projects />
  <Certificates />
  <Contact />
</main>

<style>
  .corner-controls {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 70;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  }
</style>
