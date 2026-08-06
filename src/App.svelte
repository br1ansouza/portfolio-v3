<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { startSmoothScroll, stopSmoothScroll } from './lib/actions/smoothScroll';
  import type { VelocityListener } from './lib/actions/smoothScroll';
  import Scanlines from './lib/components/Scanlines.svelte';
  import Hero from './lib/components/Hero.svelte';
  import About from './lib/components/About.svelte';
  import Projects from './lib/components/Projects.svelte';
  import Certificates from './lib/components/Certificates.svelte';
  import Contact from './lib/components/Contact.svelte';

  let scrollIntensity: number = $state(0);

  const handleVelocity: VelocityListener = (intensity: number) => {
    scrollIntensity = intensity;
  };

  onMount(() => {
    startSmoothScroll(handleVelocity);
  });

  onDestroy(() => {
    stopSmoothScroll();
  });
</script>

<Scanlines intensity={scrollIntensity} />

<main>
  <Hero />
  <About />
  <Projects />
  <Certificates />
  <Contact />
</main>
