<script setup lang="ts">
import KatexBlock from './KatexBlock.vue'
</script>

<template>
  <div class="safe-learning-challenges">
    <svg class="sets-svg" viewBox="0 0 1000 520" role="img" aria-label="Challenges in online safe learning sets">
      <defs>
        <marker
          id="safe-known-arrowhead"
          viewBox="0 0 10 10"
          markerWidth="8"
          markerHeight="8"
          refX="8.4"
          refY="5"
          orient="auto"
        >
          <path d="M1.5 1.5L8.5 5L1.5 8.5" fill="#5c489c" stroke="#5c489c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </marker>
        <marker
          id="constraint-arrowhead"
          viewBox="0 0 10 10"
          markerWidth="8"
          markerHeight="8"
          refX="8.4"
          refY="5"
          orient="auto"
        >
          <path d="M1.5 1.5L8.5 5L1.5 8.5" fill="#07865a" stroke="#07865a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </marker>
      </defs>

      <path
        class="constraint-region"
        d="M50 405C46 348 81 326 141 312C219 293 298 286 380 300C459 313 524 279 602 233C682 186 706 143 710 76C714 22 787 12 872 11C944 10 988 23 997 80C1015 194 937 270 816 315C711 354 632 379 543 420C451 463 407 471 318 452C221 432 135 454 78 438C60 433 52 424 50 405Z"
      />

      <path
        class="known-safe-region"
        d="M98 378C105 338 175 314 266 302C358 290 443 292 494 303C539 313 536 337 488 359C441 381 352 399 268 421C209 437 151 425 118 406C101 396 94 387 98 378Z"
      />

      <path
        class="known-safe-arrow"
        d="M290 172C252 210 225 250 219 300"
        marker-end="url(#safe-known-arrowhead)"
      />
      <path
        class="constraint-arrow"
        d="M950 322C884 292 813 257 745 218"
        marker-end="url(#constraint-arrowhead)"
      />
    </svg>

    <div class="annotation known-safe">
      <div class="annotation-title">policies known to be safe</div>
      <KatexBlock class="annotation-math" :display="false" expr="\{\pi \mid \max_{\mathcal{F}} J_c(\pi) &lt; d\}" />
    </div>

    <div class="annotation constraint-safe">
      <div>All policies that satisfy the constraint,</div>
      <div>having knowledge of the problem</div>
    </div>

    <KatexBlock class="pi-star" :display="false" expr="\pi^*" />
  </div>
</template>

<style scoped>
.safe-learning-challenges {
  position: relative;
  width: 100%;
  height: 100%;
}

.sets-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.constraint-region {
  fill: #e7f3ef;
  opacity: 0.98;
}

.known-safe-region {
  fill: #dcd4e9;
  opacity: 0.9;
  stroke: #5c489c;
  stroke-width: 3.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.known-safe-arrow {
  fill: none;
  stroke: #5c489c;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.constraint-arrow {
  fill: none;
  stroke: #07865a;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.annotation {
  position: absolute;
  z-index: 2;
  color: #111;
  line-height: 1.12;
}

.known-safe {
  left: 16.5rem;
  top: 3.8rem;
  width: 22rem;
  text-align: center;
}

.annotation-title {
  margin-bottom: 0.28rem;
  color: #5c489c;
  font-size: 1.05rem;
  font-weight: 650;
}

.annotation-math {
  color: #5c489c;
  font-size: 0.9rem;
}

.constraint-safe {
  right: 0.7rem;
  top: 17.05rem;
  width: 17.2rem;
  color: #07865a;
  font-size: 0.9rem;
  font-weight: 650;
}

.pi-star {
  position: absolute;
  left: 44.55rem;
  top: 5.9rem;
  z-index: 2;
  color: #07865a;
  font-size: 1.55rem;
  font-weight: 700;
}

</style>
