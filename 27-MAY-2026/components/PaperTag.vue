<script setup lang="ts">
withDefaults(
  defineProps<{
    conference: string
    year: string | number
    href: string
    note?: string
    side?: 'left' | 'right'
  }>(),
  {
    side: 'left',
  },
)
</script>

<template>
  <a
    :class="['paper-tag', `paper-tag-${side}`]"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span>{{ conference }} {{ year }}</span>
    <span v-if="note" class="paper-tag-note">{{ note }}</span>
  </a>
</template>

<style scoped>
.paper-tag {
  position: absolute;
  bottom: 0.62rem;
  z-index: 30;
  display: inline-flex;
  align-items: baseline;
  gap: 0.32rem;
  color: black;
  border-bottom: 1.4px solid rgba(0, 0, 0, 0.46);
  font-size: 0.72rem;
  line-height: 1;
  opacity: 0.68;
  text-decoration: none;
}

.paper-tag-note {
  font-size: 0.58rem;
  opacity: 0.78;
}

.paper-tag-left {
  left: 1.1rem;
}

.paper-tag-right {
  right: 1.1rem;
}
</style>
