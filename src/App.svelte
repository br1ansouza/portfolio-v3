<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { startSmoothScroll, stopSmoothScroll } from './lib/actions/smoothScroll';
  import Hero from './lib/components/Hero.svelte';
  import About from './lib/components/About.svelte';
  import Projects from './lib/components/Projects.svelte';
  import Certificates from './lib/components/Certificates.svelte';
  import Contact from './lib/components/Contact.svelte';

  onMount(() => {
    startSmoothScroll();
  });

  onDestroy(() => {
    stopSmoothScroll();
  });
</script>

<main>
  <Hero />
  <About />
  <Projects />
  <Certificates />
  <Contact />
</main>
