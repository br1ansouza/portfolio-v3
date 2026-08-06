<script lang="ts">
  import { onMount } from 'svelte';
  import { VERTEX_SOURCE, FRAGMENT_SOURCE } from '../actions/ditherShader';

  interface Props {
    scroll?: number;
  }

  let { scroll = 0 }: Props = $props();

  let canvas: HTMLCanvasElement | undefined = $state();
  let supported = $state(true);

  function compile(gl: WebGL2RenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function readColor(name: string): [number, number, number] {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    const hex = raw.replace('#', '');
    if (hex.length !== 6) return [0, 0, 0];
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ];
  }

  onMount(() => {
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      supported = false;
      return;
    }

    const gl = canvas.getContext('webgl2', { alpha: true, antialias: false });
    if (!gl) {
      supported = false;
      return;
    }

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SOURCE);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SOURCE);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      supported = false;
      return;
    }

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      supported = false;
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const attribute = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'uResolution'),
      time: gl.getUniformLocation(program, 'uTime'),
      pointer: gl.getUniformLocation(program, 'uPointer'),
      scroll: gl.getUniformLocation(program, 'uScroll'),
      ink: gl.getUniformLocation(program, 'uInk'),
      accent: gl.getUniformLocation(program, 'uAccent'),
    };

    gl.uniform3fv(uniforms.ink, readColor('--color-surface-700'));
    gl.uniform3fv(uniforms.accent, readColor('--color-primary-500'));

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let visible = true;
    let frame = 0;

    function resize() {
      if (!canvas || !gl) return;
      const ratio = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.floor(canvas.clientWidth * ratio);
      canvas.height = Math.floor(canvas.clientHeight * ratio);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    }

    function handlePointer(event: PointerEvent) {
      if (!canvas) return;
      const box = canvas.getBoundingClientRect();
      pointer.targetX = (event.clientX - box.left - box.width / 2) / box.height;
      pointer.targetY = -(event.clientY - box.top - box.height / 2) / box.height;
    }

    function render(now: number) {
      frame = requestAnimationFrame(render);
      if (!visible || !gl) return;
      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;
      gl.uniform1f(uniforms.time, now / 1000);
      gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
      gl.uniform1f(uniforms.scroll, scroll);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointer);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointer);
    };
  });
</script>

<canvas bind:this={canvas} class="field" class:field--off={!supported} aria-hidden="true"></canvas>

<style>
  .field {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

  .field--off {
    display: none;
  }
</style>
