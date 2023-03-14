<script setup lang="ts">
const props = defineProps<{
  title?: string
  image: string;
}>();
</script>

<template>
  <div class="m-auto text-center">
    <h4>{{ props.title }}</h4>
    <figure>
      <img
        :src="props.image"
        class="rounded-full h-50 w-50 border-2 border-slate-700 leading-50 inline-block m-auto object-cover"
      />
    </figure>
    <figcaption>
      <slot></slot>
    </figcaption>
  </div>
</template>
