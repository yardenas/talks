<template>
  <footer
    v-if="$nav.currentLayout !== 'cover'"
    class="pointer-events-none fixed bottom-3 right-4 z-50 text-[0.65rem] leading-none opacity-45"
  >
    {{ $nav.currentPage }} / {{ $nav.total }}
  </footer>
</template>
