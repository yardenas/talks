<script setup lang="ts">
const props = defineProps<{
  size: string;
}>();
const size = props.size ?? "text-5xl";
</script>

<template>
  <div>
    <ph-activity-fill :class="`text-violet-300 opacity-85 absolute ${size}`" />
    <ph-activity-fill :class="`text-violet-400 opacity-85 absolute ${size} ml-1.25`" />
    <ph-activity-fill :class="`text-violet-500 opacity-85 absolute ${size} ml-2.5`"/>
  </div>
</template>
