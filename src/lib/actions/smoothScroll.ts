import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

let lenis: Lenis | undefined;

export function startSmoothScroll(): void {
  gsap.registerPlugin(ScrollTrigger);

  lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

export function stopSmoothScroll(): void {
  lenis?.destroy();
  lenis = undefined;
}
