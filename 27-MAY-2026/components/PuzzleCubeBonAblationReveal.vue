<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import plotSvg from '../public/deck/puzzle_cube_dyna_bon_ablation_eval_success_puzzle_cube.svg?raw'

const { $clicks } = useSlideContext()

const stageClass = computed(() => `stage-${Math.min($clicks.value, 3)}`)
</script>

<template>
  <div
    class="puzzle-cube-bon-reveal relative"
    :class="stageClass"
    role="img"
    aria-label="Puzzle and cube task success curves revealed one method at a time"
  >
    <span v-click class="click-step" aria-hidden="true" />
    <span v-click class="click-step" aria-hidden="true" />
    <span v-click class="click-step" aria-hidden="true" />

    <div class="svg-host" v-html="plotSvg" />
  </div>
</template>

<style>
.puzzle-cube-bon-reveal .click-step {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}

.puzzle-cube-bon-reveal .svg-host,
.puzzle-cube-bon-reveal .svg-host svg {
  display: block;
  width: 100%;
  height: 100%;
}

.puzzle-cube-bon-reveal.stage-0 :is(
  #FillBetweenPolyCollection_1,
  #FillBetweenPolyCollection_2,
  #FillBetweenPolyCollection_3,
  #FillBetweenPolyCollection_5,
  #FillBetweenPolyCollection_6,
  #FillBetweenPolyCollection_7,
  #line2d_23,
  #line2d_24,
  #line2d_25,
  #line2d_50,
  #line2d_51,
  #line2d_52,
  #line2d_55,
  #line2d_56,
  #line2d_57
) {
  display: none;
}

.puzzle-cube-bon-reveal.stage-0 :is(
  #text_24,
  #text_25,
  #text_26
) use {
  display: none;
}

.puzzle-cube-bon-reveal.stage-1 :is(
  #FillBetweenPolyCollection_1,
  #FillBetweenPolyCollection_2,
  #FillBetweenPolyCollection_5,
  #FillBetweenPolyCollection_6,
  #line2d_23,
  #line2d_24,
  #line2d_50,
  #line2d_51,
  #line2d_55,
  #line2d_56
) {
  display: none;
}

.puzzle-cube-bon-reveal.stage-1 :is(
  #text_24,
  #text_25
) use {
  display: none;
}

.puzzle-cube-bon-reveal.stage-2 :is(
  #FillBetweenPolyCollection_1,
  #FillBetweenPolyCollection_5,
  #line2d_23,
  #line2d_50,
  #line2d_55
) {
  display: none;
}

.puzzle-cube-bon-reveal.stage-2 #text_24 use {
  display: none;
}
</style>
