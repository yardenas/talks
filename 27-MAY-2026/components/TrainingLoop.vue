<script setup lang="ts">
import KatexBlock from './KatexBlock.vue'

withDefaults(
  defineProps<{
    compact?: boolean
    focus?: 'collect' | 'model' | 'plan' | ''
  }>(),
  {
    compact: false,
    focus: '',
  }
)
</script>

<template>
  <div class="training-loop" :class="{ compact }">
    <svg class="loop-svg" viewBox="0 0 1200 560" role="img" aria-label="SOOPER training loop">
      <path d="M 350 56 H 88 Q 42 56 42 102 V 146 Q 42 168 64 168 H 116" :class="['loop-line', { focused: focus === 'collect' }]" />
      <polygon points="138,168 116,157 116,179" :class="['arrow-head', { focused: focus === 'collect' }]" />
      <path :d="compact ? 'M 1048 168 H 1138 Q 1184 168 1184 122 V 102 Q 1184 56 1138 56 H 880' : 'M 1008 168 H 1138 Q 1184 168 1184 122 V 102 Q 1184 56 1138 56 H 880'" class="loop-line" />
      <polygon points="858,56 880,45 880,67" class="arrow-head" />
      <path d="M 340 168 H 472" :class="['loop-line', { focused: focus === 'model' }]" />
      <polygon points="494,168 472,157 472,179" :class="['arrow-head', { focused: focus === 'model' }]" />
      <path :d="compact ? 'M 706 168 H 852' : 'M 686 168 H 872'" :class="['loop-line', { focused: focus === 'plan' }]" />
      <polygon :points="compact ? '874,168 852,157 852,179' : '894,168 872,157 872,179'" :class="['arrow-head', { focused: focus === 'plan' }]" />
    </svg>

    <div class="iterate-box">
      <KatexBlock class="iterate-math" expr="\text{Iterate for } n=0,\ldots,N-1\text{ episodes}" />
    </div>

    <div :class="['label label-collect', { focused: focus === 'collect' }]">
      <span class="label-text">Collect data</span>
    </div>
    <div :class="['label label-model', { focused: focus === 'model' }]">
      <span class="label-text">Improve model</span>
    </div>
    <div :class="['label label-plan', { focused: focus === 'plan' }]">
      <span class="label-text">Plan</span>
    </div>

    <div class="desc desc-collect">
      <div>
        Deploy <KatexBlock class="inline-math" :display="false" expr="\pi_n" /> safely and append
      </div>
      <div>
        real transitions to <KatexBlock class="inline-math" :display="false" expr="\mathcal{D}_{\le n}" />.
      </div>
    </div>
    <div class="desc desc-model">
      <div>Fit the dynamics model</div>
      <div>from all collected data.</div>
    </div>
    <div class="desc desc-plan">
      <div>Plan optimistically for reward,</div>
      <div>pessimistically for cost.</div>
      <div>
        Return the next <KatexBlock class="inline-math" :display="false" expr="\pi_{n+1}" />.
      </div>
    </div>

    <div v-if="compact && focus === 'collect'" class="focus-chip">rollout / collect data</div>
  </div>
</template>

<style scoped>
.training-loop {
  position: relative;
  width: 100%;
  height: 100%;
}

.loop-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.loop-line {
  fill: none;
  stroke: black;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.loop-line.focused {
  stroke: #5b45a5;
  stroke-width: 7;
}

.arrow-head {
  fill: black;
}

.arrow-head.focused {
  fill: #5b45a5;
}

.iterate-box {
  position: absolute;
  left: 23%;
  top: 0;
  display: flex;
  width: 54%;
  height: 3.4rem;
  align-items: center;
  justify-content: center;
  border: 2.5px solid black;
  background: white;
  z-index: 2;
  overflow: hidden;
  padding: 0 0.8rem;
}

.iterate-math {
  font-size: 0.78rem;
  white-space: nowrap;
}

.label {
  position: absolute;
  top: 6.35rem;
  width: max-content;
  text-align: center;
  font-size: 1.22rem;
  font-weight: 650;
  line-height: 1;
  transform: translateX(-50%);
  z-index: 2;
}

.label.focused {
  color: #5b45a5;
}

.label-text {
  display: inline-block;
  background: white;
  padding: 0 0.16rem;
}

.label-collect {
  left: 21%;
}

.label-model {
  left: 51.5%;
}

.label-plan {
  left: 78.8%;
}

.desc {
  position: absolute;
  top: 8.9rem;
  text-align: center;
  font-size: 0.98rem;
  line-height: 1.18;
}

.desc-collect {
  left: 3.2%;
  width: 31%;
}

.desc-model {
  left: 36.5%;
  width: 27%;
}

.desc-plan {
  left: 70%;
  width: 27%;
}

.inline-math {
  display: inline-block;
}

.focus-chip {
  position: absolute;
  left: 8.8%;
  top: 12.15rem;
  border-radius: 999px;
  background: #5b45a5;
  color: white;
  padding: 0.12rem 0.42rem;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.compact .loop-line {
  stroke-width: 5;
}

.compact .loop-line.focused {
  stroke-width: 8;
}

.compact .iterate-box {
  left: 25%;
  width: 50%;
  height: 1.5rem;
  border-width: 1.8px;
  padding: 0 0.35rem;
}

.compact .iterate-math {
  font-size: 0.3rem;
}

.compact .label {
  top: 1.82rem;
  font-size: 0.43rem;
}

.compact .label-collect {
  left: 24%;
}

.compact .label-model {
  left: 53%;
}

.compact .label-plan {
  left: 77%;
}

.compact .desc {
  display: none;
}

.compact .focus-chip {
  left: 16%;
  top: 2.95rem;
  padding: 0.08rem 0.28rem;
  font-size: 0.38rem;
}
</style>
