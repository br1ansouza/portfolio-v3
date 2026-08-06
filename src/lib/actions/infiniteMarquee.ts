import gsap from 'gsap';
import type { Action } from 'svelte/action';

const LERP = 0.12;
const WHEEL_SCALE = 1.1;

interface MarqueeOptions {
  track: HTMLElement | undefined;
  count: number;
}

export const infiniteMarquee: Action<HTMLElement, MarqueeOptions> = (
  node,
  options,
) => {
  const track = options.track;
  if (!track) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let offset = 0;
  let target = 0;
  let period = 0;
  let frame = 0;

  function measure() {
    const second = track!.children[options.count] as HTMLElement | undefined;
    period = second ? second.offsetLeft : track!.scrollWidth / 2;
  }

  function handleWheel(event: WheelEvent) {
    if (period <= 0) return;
    event.preventDefault();
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
    target += delta * WHEEL_SCALE;
  }

  function tick() {
    frame = requestAnimationFrame(tick);
    if (period <= 0) return;

    offset += (target - offset) * LERP;

    if (offset >= period) {
      offset -= period;
      target -= period;
    } else if (offset < 0) {
      offset += period;
      target += period;
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
