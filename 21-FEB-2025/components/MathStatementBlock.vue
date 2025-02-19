<template>
  <div
    class="bg-white p-3 rounded-lg shadow-sm border border-gray-200 my-1"
  >
    <div>
      <div class="flex gap-2 items-baseline">
        <span class="font-bold">{{ type }} {{ number }}</span>
        <span v-if="title" class="italic text-gray-600"
          >({{ title }})</span
        >
      </div>
      <div class="mt-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) =>
      ["Assumption", "Definition", "Theorem", "Lemma"].includes(value),
  },
  number: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
});
</script>
