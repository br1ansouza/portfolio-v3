import gsap from 'gsap';
import type { Action } from 'svelte/action';

const LERP = 0.12;
const WHEEL_SCALE = 1.1;

export const infiniteMarquee: Action<HTMLElement, HTMLElement | undefined> = (
  node,
  track,
) => {
  if (!track) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let offset = 0;
  let target = 0;
  let half = 0;
  let frame = 0;

  function measure() {
    half = track!.scrollWidth / 2;
  }

  function handleWheel(event: WheelEvent) {
    if (half <= 0) return;
    event.preventDefault();
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
    target += delta * WHEEL_SCALE;
  }

  function tick() {
    frame = requestAnimationFrame(tick);
    if (half <= 0) return;

    offset += (target - offset) * LERP;

    if (offset > half) {
      offset -= half;
      target -= half;
    } else if (offset < 0) {
      offset += half;
      target += half;
    }

    gsap.set(track!, { x: -offset });
  }

  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(track);

  measure();
  node.addEventListener('wheel', handleWheel, { passive: false });
  frame = requestAnimationFrame(tick);

  return {
    destroy() {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      node.removeEventListener('wheel', handleWheel);
      gsap.set(track!, { clearProps: 'x' });
    },
  };
};
