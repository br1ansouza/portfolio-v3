import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export type VelocityListener = (intensity: number) => void;

const MAX_VELOCITY = 45;

let lenis: Lenis | undefined;
let ticker: ((time: number) => void) | undefined;

export function startSmoothScroll(onVelocity?: VelocityListener): void {
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  lenis = new Lenis({ lerp: 0.1 });

  lenis.on('scroll', (instance: { velocity: number }) => {
    ScrollTrigger.update();
    if (!onVelocity) return;
    onVelocity(Math.min(Math.abs(instance.velocity) / MAX_VELOCITY, 1));
  });

  ticker = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);
}

export function stopSmoothScroll(): void {
  if (ticker) gsap.ticker.remove(ticker);
  lenis?.destroy();
  lenis = undefined;
  ticker = undefined;
}
