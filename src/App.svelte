<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { startSmoothScroll, stopSmoothScroll } from './lib/actions/smoothScroll';
  import Nav from './lib/components/Nav.svelte';
  import Hero from './lib/components/Hero.svelte';
  import About from './lib/components/About.svelte';
  import Projects from './lib/components/Projects.svelte';
  import Certificates from './lib/components/Certificates.svelte';
  import Contact from './lib/components/Contact.svelte';
  import Footer from './lib/components/Footer.svelte';

  onMount(() => {
    startSmoothScroll();
  });

  onDestroy(() => {
    stopSmoothScroll();
  });
</script>

<Nav />

<main>
  <Hero />
  <About />
  <Projects />
  <Certificates />
  <Contact />
</main>

<Footer />
