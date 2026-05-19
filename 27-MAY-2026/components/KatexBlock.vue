<script setup lang="ts">
import { computed } from 'vue'
import katex from 'katex'

const props = withDefaults(
  defineProps<{
    expr: string
    display?: boolean
  }>(),
  {
    display: true,
  },
)

const html = computed(() =>
  katex.renderToString(props.expr, {
    displayMode: props.display,
    throwOnError: false,
  }),
)
</script>

<template>
  <div v-html="html" />
</template>

<style scoped>
:deep(.katex-display) {
  margin: 0;
}
</style>
