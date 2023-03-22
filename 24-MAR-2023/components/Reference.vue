<script setup lang="ts">
const props = defineProps<{
  link?: string;
  textSize?: string;
  translate?: string;
}>();

const textSize = props.textSize ?? "text-0.3em";
const translate =
  props.translate ?? "translate-y-[-1.5em] translate-x-[-0.25em]";
</script>

<template>
  <a
    :href="props.link"
    target="_blank"
    :class="`bg-$prism-background !border-none px-2 py-1 rounded font-mono inline-block ${textSize} transform ${translate} text-orange-400`"
    >[<slot />]</a
  >
</template>
