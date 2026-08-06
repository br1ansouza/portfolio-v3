import gsap from 'gsap';
import type { Action } from 'svelte/action';

const PUSH_DISTANCE = 26;
const INFLUENCE_RADIUS = 110;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const letterPush: Action<HTMLElement, string> = (node, text) => {
  const letters: HTMLElement[] = [];

  function build(value: string) {
    node.textContent = '';
    letters.length = 0;

    for (const character of value) {
      const span = document.createElement('span');
      span.textContent = character === ' ' ? ' ' : character;
      span.style.display = 'inline-block';
      span.style.willChange = 'transform';
      node.appendChild(span);
      letters.push(span);
    }
  }

  build(text);

  if (
    prefersReducedMotion() ||
    window.matchMedia('(pointer: coarse)').matches
  ) {
    return {
      update: build,
      destroy() {},
    };
  }

  function handleMove(event: PointerEvent) {
    for (const letter of letters) {
      const box = letter.getBoundingClientRect();
      const centerX = box.left + box.width / 2;
      const centerY = box.top + box.height / 2;
      const deltaX = centerX - event.clientX;
      const deltaY = centerY - event.clientY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance > INFLUENCE_RADIUS) {
        gsap.to(letter, { x: 0, y: 0, duration: 0.5, ease: 'steps(5)' });
        continue;
      }

      const force = 1 - distance / INFLUENCE_RADIUS;
      gsap.to(letter, {
        x: (deltaX / distance) * PUSH_DISTANCE * force,
        y: (deltaY / distance) * PUSH_DISTANCE * force,
        duration: 0.25,
        ease: 'steps(4)',
        overwrite: true,
      });
    }
  }

  function handleLeave() {
    gsap.to(letters, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'steps(6)',
      overwrite: true,
    });
  }

  window.addEventListener('pointermove', handleMove);
  node.addEventListener('pointerleave', handleLeave);

  return {
    update: build,
    destroy() {
      window.removeEventListener('pointermove', handleMove);
      node.removeEventListener('pointerleave', handleLeave);
      gsap.killTweensOf(letters);
    },
  };
};
