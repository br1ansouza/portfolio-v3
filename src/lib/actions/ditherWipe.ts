import gsap from 'gsap';
import { bayerOrder } from './bayer';

const COLUMNS = 28;
const ROWS = 16;
const TOTAL = COLUMNS * ROWS;
const HALF = 0.42;

export function ditherWipe(
  background: string,
  swap: () => void,
): Promise<void> {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:80',
      'display:grid',
      'pointer-events:none',
      `grid-template-columns:repeat(${COLUMNS},1fr)`,
      `grid-template-rows:repeat(${ROWS},1fr)`,
    ].join(';');

    const blocks: HTMLElement[] = [];
    for (let i = 0; i < TOTAL; i += 1) {
      const block = document.createElement('span');
      block.style.cssText = `background:${background};opacity:0`;
      overlay.appendChild(block);
      blocks.push(block);
    }
    document.body.appendChild(overlay);

    const order = bayerOrder(COLUMNS, ROWS);
    const stagger = (index: number) => (order[index] / TOTAL) * HALF;

    gsap.to(blocks, {
      opacity: 1,
      duration: 0.01,
      ease: 'none',
      stagger,
      onComplete: () => {
        swap();
        gsap.to(blocks, {
          opacity: 0,
          duration: 0.01,
          ease: 'none',
          stagger,
          onComplete: () => {
            overlay.remove();
            resolve();
          },
        });
      },
    });
  });
}

export function currentBackground(): string {
  return getComputedStyle(document.body).backgroundColor;
}
