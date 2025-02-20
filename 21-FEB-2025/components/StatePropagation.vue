<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import gsap from "gsap";

const step = ref(0);
const numModels = 5;
const numTimeSteps = 5; // Changed to 5 timesteps
const selectedParticle = ref(null);
const showDisagreement = ref(false);
const showPropagationArrows = ref(false);
const isAnimating = ref(true);

const colors = {
  particle: "#4B9CD3",
  selectedParticle: "#2563EB",
  distribution: "#9CA3AF",
  uncertainty: "#4B5563",
  uncertaintyOuter: "#6B7280",
  disagreement: "#059669",
  disagreementFill: "rgba(5, 150, 105, 0.7)",
  propagationArrow: "rgba(37, 99, 235, 0.4)",
};

// Modified time step positions for 5 steps
const timeSteps = Array(numTimeSteps)
  .fill()
  .map((_, i) => ({
    x: 150 + i * 165, // Adjusted spacing
    y: 200,
    width: 20,
    height: 100,
    // Add random variations to make each uncertainty ellipse slightly different
    innerEllipseRX: 15 + Math.random() * 12 + i * 5,
    innerEllipseRY: 30 + Math.random() * 12 + i * 5,
    ellipseRX: 35 + Math.random() * 15 + i * 5,
    ellipseRY: 60 + Math.random() * 15 + i * 5,
    outerEllipseRX: 45 + Math.random() * 12 + i * 5,
    outerEllipseRY: 75 + Math.random() * 12 + i * 5,
  }));

// Initialize particles at first timestep
const resetParticles = () => {
  particles.value = [
    { id: 1, x: timeSteps[0].x, y: 180, opacity: 1 },
    { id: 2, x: timeSteps[0].x, y: 200, opacity: 1 },
    { id: 3, x: timeSteps[0].x, y: 220, opacity: 1 },
  ];
};

const particles = ref([]);
resetParticles();

const ensembleParticles = ref([]);

// Propagation arrows computation remains the same
const propagationArrows = computed(() => {
  if (
    !selectedParticle.value ||
    !ensembleParticles.value.length ||
    !showPropagationArrows.value
  ) {
    return [];
  }

  return ensembleParticles.value.map((target, index) => ({
    id: `arrow-${index}`,
    x1: selectedParticle.value.x,
    y1: selectedParticle.value.y,
    x2: target.x,
    y2: target.y,
    opacity: target.opacity || 0,
  }));
});

// Modified animation sequence
const animate = async () => {
  if (!isAnimating.value) return;

  if (step.value >= numTimeSteps - 1) {
    step.value = 0;
    selectedParticle.value = null;
    showDisagreement.value = false;
    showPropagationArrows.value = false;
    ensembleParticles.value = [];
    resetParticles();
    await new Promise((r) => setTimeout(r, 1000));
    if (isAnimating.value) animate();
    return;
  }

  const randomIndex = Math.floor(Math.random() * particles.value.length);
  particles.value = particles.value.map((p, i) => ({
    ...p,
    opacity: i === randomIndex ? 1 : 0.2,
  }));
  selectedParticle.value = {
    ...particles.value[randomIndex],
    color: colors.selectedParticle,
  };
  await new Promise((r) => setTimeout(r, 1000));

  const nextX = timeSteps[step.value + 1].x;
  ensembleParticles.value = Array(numModels)
    .fill()
    .map((_, i) => ({
      id: `ensemble-${i}`,
      x: nextX,
      y: selectedParticle.value.y + (Math.random() - 0.5) * 45,
      opacity: 0,
    }));

  showPropagationArrows.value = true;

  for (let i = 0; i < ensembleParticles.value.length; i++) {
    ensembleParticles.value[i].opacity = 1;
    await new Promise((r) => setTimeout(r, 200));
  }
  await new Promise((r) => setTimeout(r, 800));

  showDisagreement.value = true;
  await new Promise((r) => setTimeout(r, 2000));

  showPropagationArrows.value = false;
  particles.value = ensembleParticles.value.map((p) => ({ ...p, opacity: 1 }));
  selectedParticle.value = null;
  showDisagreement.value = false;
  step.value++;

  if (isAnimating.value) animate();
};

onMounted(() => {
  animate();
});

onUnmounted(() => {
  isAnimating.value = false;
});
</script>

<template>
  <div class="w-full h-96 bg-white">
    <svg width="100%" height="100%" viewBox="0 0 900 400">
      <!-- Draw timestep uncertainty areas and bars -->
      <template v-for="(ts, i) in timeSteps" :key="i">
        <!-- Outer uncertainty ellipse -->
        <ellipse
          :cx="ts.x"
          :cy="ts.y"
          :rx="ts.outerEllipseRX"
          :ry="ts.outerEllipseRY"
          :fill="colors.uncertaintyOuter"
          opacity="0.05"
        />

        <!-- Inner uncertainty ellipse -->
        <ellipse
          :cx="ts.x"
          :cy="ts.y"
          :rx="ts.ellipseRX"
          :ry="ts.ellipseRY"
          :fill="colors.uncertainty"
          opacity="0.1"
        />
        <!-- Inner inner uncertainty ellipse -->
        <ellipse
          :cx="ts.x"
          :cy="ts.y"
          :rx="ts.innerEllipseRX"
          :ry="ts.innerEllipseRY"
          :fill="colors.uncertainty"
          opacity="0.3"
        />
      </template>

      <!-- Draw regular particles -->
      <circle
        v-for="particle in particles"
        :key="particle.id"
        :cx="particle.x"
        :cy="particle.y"
        r="6"
        :fill="colors.particle"
        :opacity="particle.opacity"
      />

      <!-- Draw selected particle -->
      <circle
        v-if="selectedParticle"
        :cx="selectedParticle.x"
        :cy="selectedParticle.y"
        r="6"
        :fill="selectedParticle.color"
      />

      <!-- Add propagation arrows -->
      <template v-if="showPropagationArrows">
        <g v-for="arrow in propagationArrows" :key="arrow.id">
          <path
            :d="`
              M ${arrow.x1} ${arrow.y1}
              C ${(arrow.x1 + arrow.x2) / 2} ${arrow.y1},
                ${(arrow.x1 + arrow.x2) / 2} ${arrow.y2},
                ${arrow.x2} ${arrow.y2}
            `"
            fill="none"
            :stroke="colors.propagationArrow"
            stroke-width="1.5"
            :opacity="arrow.opacity"
            marker-end="url(#propagation-arrow)"
          />
        </g>

        <defs>
          <marker
            id="propagation-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" :fill="colors.propagationArrow" />
          </marker>
        </defs>
      </template>

      <!-- Draw ensemble particles -->
      <template v-if="ensembleParticles.length">
        <circle
          v-for="particle in ensembleParticles"
          :key="particle.id"
          :cx="particle.x"
          :cy="particle.y"
          r="6"
          :fill="colors.particle"
          :opacity="particle.opacity"
        />

        <!-- Show disagreement visualization -->
        <template v-if="showDisagreement">
          <!-- Background area for disagreement -->
          <path :d="`
              M ${ensembleParticles[0].x - 10} ${Math.min(...ensembleParticles.map((p) => p.y)) - 10}
              L ${ensembleParticles[0].x + 10} ${Math.min(...ensembleParticles.map((p) => p.y)) - 10}
              L ${ensembleParticles[0].x + 10} ${Math.max(...ensembleParticles.map((p) => p.y)) + 10}
              L ${ensembleParticles[0].x - 10} ${Math.max(...ensembleParticles.map((p) => p.y)) + 10}
              Z
            `"
            :fill="colors.disagreementFill"
          />
          <!-- Arrow markers -->
          <defs>
            <marker
              id="arrow-start"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" :fill="colors.disagreement" />
            </marker>
            <marker
              id="arrow-end"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" :fill="colors.disagreement" />
            </marker>
          </defs>
        </template>
      </template>
    </svg>
  </div>
</template>
