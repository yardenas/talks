<script setup lang="ts">
const props = defineProps<{
  width: string;
  height: string;
  color?: string;
  radius?: string;
}>();

const color = props.color ?? "border-dark-500";
const radius = props.radius ?? "rounded-sm";
</script>

<template>
  <div
    :class="`flex bg-white ${color} border-solid border-2 ${radius} ${props.width} ${props.height}`"
  >
    <div :class="`m-auto`"><slot /></div>
  </div>
</template>
