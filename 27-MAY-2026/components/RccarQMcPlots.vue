<template>
  <div class="rccar-qmc-plots">
    <figure
      class="rccar-qmc-plot"
      style="--plot-ratio: 1.2; --crop-offset: -68.9%"
    >
      <div class="rccar-qmc-crop" role="img" aria-label="Unstable action-value error plot">
        <img class="rccar-qmc-source" src="/deck/rccar-q-mc-scatter-summary.svg" alt="" />
      </div>
    </figure>

    <figure
      class="rccar-qmc-plot"
      style="--plot-ratio: 1.32; --crop-offset: -35.70%"
    >
      <div v-click class="rccar-qmc-crop" role="img" aria-label="Stable action-value error plot">
        <img class="rccar-qmc-source" src="/deck/rccar-q-mc-scatter-summary.svg" alt="" />
      </div>
    </figure>

    <figure
      class="rccar-qmc-plot"
      style="--plot-ratio: 1.34; --crop-offset: 0%"
    >
      <div v-click class="rccar-qmc-crop" role="img" aria-label="Stable and unstable return summary plot">
        <img class="rccar-qmc-source" src="/deck/rccar-q-mc-scatter-summary.svg" alt="" />
      </div>
    </figure>
  </div>
</template>

<style scoped>
.rccar-qmc-plots {
  display: grid;
  grid-template-columns: 1.2fr 1.32fr 1.34fr;
  column-gap: 1.18rem;
  align-items: center;
  width: 100%;
  height: 100%;
}

.rccar-qmc-plot {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 0;
  margin: 0;
  overflow: hidden;
}

.rccar-qmc-crop {
  position: relative;
  display: block;
  width: 100%;
  max-height: 100%;
  aspect-ratio: var(--plot-ratio);
  overflow: hidden;
}

.rccar-qmc-source {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  max-width: none;
  width: auto;
  height: 100%;
  transform: translateX(var(--crop-offset));
}
</style>
