import gsap from 'gsap';
import type { Action } from 'svelte/action';

const LERP = 0.12;
const WHEEL_SCALE = 1.1;
const SETTLED = 0.5;

interface MarqueeOptions {
  track: HTMLElement | undefined;
  count: number;
  onActive: (index: number) => void;
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
  let pointerX = 0;
  let pointerY = 0;
  let pointerInside = false;
  let active = -1;

  function measure() {
    const second = track!.children[options.count] as HTMLElement | undefined;
    period = second ? second.offsetLeft : track!.scrollWidth / 2;
  }

  function setActive(index: number) {
    if (index === active) return;
    active = index;
    options.onActive(index);
  }

  function refreshActive() {
    if (!pointerInside) {
      setActive(-1);
      return;
    }
    const element = document.elementFromPoint(pointerX, pointerY);
    const card = element?.closest<HTMLElement>('[data-card]');
    setActive(card ? Number(card.dataset.card) : -1);
  }

  function handlePointerMove(event: PointerEvent) {
    pointerX = event.clientX;
    pointerY = event.clientY;
    pointerInside = true;
    refreshActive();
  }

  function handlePointerLeave() {
    pointerInside = false;
    setActive(-1);
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

    const distance = target - offset;
    if (Math.abs(distance) < 0.01) return;

    offset += distance * LERP;

    if (offset >= period) {
      offset -= period;
      target -= period;
    } else if (offset < 0) {
      offset += period;
      target += period;
    }

    gsap.set(track!, { x: -offset });

    if (Math.abs(distance) > SETTLED) refreshActive();
  }

  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(track);

  measure();
  node.addEventListener('wheel', handleWheel, { passive: false });
  node.addEventListener('pointermove', handlePointerMove);
  node.addEventListener('pointerleave', handlePointerLeave);
  frame = requestAnimationFrame(tick);

  return {
    destroy() {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      node.removeEventListener('wheel', handleWheel);
      node.removeEventListener('pointermove', handlePointerMove);
      node.removeEventListener('pointerleave', handlePointerLeave);
      setActive(-1);
      gsap.set(track!, { clearProps: 'x' });
    },
  };
};
