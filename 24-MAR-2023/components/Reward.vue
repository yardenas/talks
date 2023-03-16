<script setup lang="ts">
const props = defineProps<{
  size: string;
}>();
const size = props.size ?? "text-5xl";
</script>

<template>
  <div>
    <fluent-reward-12-filled :class="`text-blue-gray-300 absolute ${size}`" />
  </div>
</template>
