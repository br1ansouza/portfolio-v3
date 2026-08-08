export interface SphereLayout {
  centerX: number;
  centerY: number;
  radius: number;
}

export interface SphereRect {
  x: number;
  y: number;
  size: number;
}

const RADIUS = 0.14;
const OFFSET_Y = 0.2;
const MIN_WIDTH = 760;
const HIT_INSET = 0.13;

export const HIDDEN: SphereRect = { x: 0, y: 0, size: 0 };

export function sphereLayout(width: number, height: number): SphereLayout {
  if (width < MIN_WIDTH || height <= 0) {
    return { centerX: 0, centerY: 0, radius: 0 };
  }
  const aspect = width / height;
  return {
    centerX: Math.min(0.46, aspect * 0.5 - RADIUS - 0.06),
    centerY: OFFSET_Y,
    radius: RADIUS,
  };
}

export function sphereRect(
  layout: SphereLayout,
  width: number,
  height: number,
): SphereRect {
  if (layout.radius <= 0) return HIDDEN;
  const size = layout.radius * 2 * height;
  return {
    x: width / 2 + layout.centerX * height - size / 2,
    y: height / 2 - layout.centerY * height - size / 2,
    size,
  };
}

export function sphereHit(rect: SphereRect): SphereRect {
  const inset = rect.size * HIT_INSET;
  return {
    x: rect.x + inset,
    y: rect.y + inset,
    size: rect.size - inset * 2,
  };
}
