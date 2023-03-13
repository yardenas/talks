<script setup lang="ts">
const props = defineProps<{
  link?: string;
}>();
</script>

<template>
  <a
    :href="props.link"
    target="_blank"
    class="bg-$prism-background !border-none px-2 py-1 rounded font-mono inline-block text-0.4em transform translate-y-[-1.5em] translate-x-[-0.3em] text-orange-400"
    >[<slot />]</a
  >
</template>
