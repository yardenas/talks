<script setup lang="ts">
const props = defineProps<{
  caption?: string;
  link?: string;
  image: string;
}>();
</script>

<template>
  <div class="flex items-center justify-center">
    <figure class="relative max-w-xs cursor-pointer">
      <a v-bind:href="props.link">
        <img
          class="rounded-lg shadow-xl hover:shadow-2xl"
          v-bind:src="props.image"
        />
      </a>
      <figcaption class="absolute mt-1">
        <div>
          <slot />
        </div>
      </figcaption>
    </figure>
  </div>
</template>
