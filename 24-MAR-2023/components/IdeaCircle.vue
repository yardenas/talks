<script setup lang="ts">
const props = defineProps<{
  color: string;
}>();
</script>

<template>
  <div :class="`${props.color} text-center rounded-full h-150 w-150 shadow border`">
    <slot></slot>
  </div>
</template>
