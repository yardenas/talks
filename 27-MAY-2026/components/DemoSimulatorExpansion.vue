<template>
  <div class="demo-simulator-expansion" aria-label="Simulator expansions from demonstration states">
    <svg class="expansion-svg" viewBox="0 0 1000 520" role="img">
      <path
        class="demo-shadow"
        d="M80 370 C150 315 206 300 270 300 C340 300 374 360 430 325 C500 282 532 235 590 235 C660 235 690 302 750 275 C814 250 850 212 910 190"
      />
      <path
        class="demo-trunk"
        d="M80 370 C150 315 206 300 270 300 C340 300 374 360 430 325 C500 282 532 235 590 235 C660 235 690 302 750 275 C814 250 850 212 910 190"
      />

      <g v-click class="sim-rollouts">
        <g class="rollout rollout-one">
          <path d="M110 348 C85 296 74 260 96 214" />
          <path d="M110 348 C140 294 177 263 238 245" />
          <path d="M110 348 C128 402 168 437 232 453" />
          <circle cx="96" cy="214" r="8" />
          <circle cx="238" cy="245" r="8" />
          <circle cx="232" cy="453" r="8" />
        </g>

        <g class="rollout rollout-two">
          <path d="M270 300 C247 247 250 203 279 160" />
          <path d="M270 300 C318 251 368 231 430 240" />
          <path d="M270 300 C298 365 342 399 415 402" />
          <circle cx="279" cy="160" r="8" />
          <circle cx="430" cy="240" r="8" />
          <circle cx="415" cy="402" r="8" />
        </g>

        <g class="rollout rollout-three">
          <path d="M430 325 C405 275 410 230 455 190" />
          <path d="M430 325 C476 292 528 289 585 316" />
          <path d="M430 325 C444 385 483 423 550 441" />
          <circle cx="455" cy="190" r="8" />
          <circle cx="585" cy="316" r="8" />
          <circle cx="550" cy="441" r="8" />
        </g>

        <g class="rollout rollout-four">
          <path d="M590 235 C555 190 550 145 577 96" />
          <path d="M590 235 C645 184 711 168 782 187" />
          <path d="M590 235 C618 297 665 330 732 331" />
          <circle cx="577" cy="96" r="8" />
          <circle cx="782" cy="187" r="8" />
          <circle cx="732" cy="331" r="8" />
        </g>

        <g class="rollout rollout-five">
          <path d="M750 275 C725 226 731 181 770 138" />
          <path d="M750 275 C805 240 861 240 916 276" />
          <path d="M750 275 C756 337 793 379 861 401" />
          <circle cx="770" cy="138" r="8" />
          <circle cx="916" cy="276" r="8" />
          <circle cx="861" cy="401" r="8" />
        </g>

        <g class="rollout-label">
          <text x="630" y="69">simulated rollouts</text>
          <text x="630" y="96">collected with our policy</text>
        </g>
      </g>

      <g class="state-nodes">
        <circle cx="110" cy="348" r="19" />
        <circle cx="270" cy="300" r="19" />
        <circle cx="430" cy="325" r="19" />
        <circle cx="590" cy="235" r="19" />
        <circle cx="750" cy="275" r="19" />
        <circle cx="910" cy="190" r="19" />
      </g>

      <g class="demo-label">
        <text x="102" y="438">demonstration rollout</text>
        <text x="102" y="465">collected with the demonstration policy</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.demo-simulator-expansion {
  position: relative;
  width: 100%;
  height: 100%;
}

.expansion-svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.demo-shadow {
  fill: none;
  stroke: #e5e7eb;
  stroke-width: 13;
  stroke-linecap: round;
}

.demo-trunk {
  fill: none;
  stroke: #111827;
  stroke-width: 4.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.state-nodes circle {
  fill: #fff;
  stroke: #111827;
  stroke-width: 4.2;
}

.sim-rollouts {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.rollout path {
  stroke: currentColor;
  stroke-width: 4.2;
}

.rollout circle {
  fill: #fff;
  stroke: currentColor;
  stroke-width: 3.4;
}

.rollout-one {
  color: #5c489c;
}

.rollout-two {
  color: #07865a;
}

.rollout-three {
  color: #d97706;
}

.rollout-four {
  color: #0b74b8;
}

.rollout-five {
  color: #c2410c;
}

.demo-label,
.rollout-label {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

.demo-label {
  fill: #111827;
}

.rollout-label {
  fill: #334155;
}
</style>
