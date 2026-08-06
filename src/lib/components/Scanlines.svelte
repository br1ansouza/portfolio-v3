<script lang="ts">
  interface Props {
    intensity: number;
  }

  let { intensity }: Props = $props();
</script>

<div class="scanlines" aria-hidden="true" style:opacity={intensity * 0.55}></div>

<style>
  .scanlines {
    position: fixed;
    inset: 0;
    z-index: 60;
    pointer-events: none;
    background: repeating-linear-gradient(
      to bottom,
      rgb(0 0 0 / 0.55) 0px,
      rgb(0 0 0 / 0.55) 1px,
      transparent 1px,
      transparent 3px
    );
    mix-blend-mode: multiply;
    transition: opacity 220ms linear;
  }
</style>
