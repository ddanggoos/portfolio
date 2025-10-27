<template>
  <div
    class="w-1/4 bg-neutral-50 max-w-2xs dark:bg-neutral-700 rounded-lg shadow-md p-8 hover:scale-105 hover:transition-all duration-300"
  >
    <div v-if="img">
      <img
        class="w-full h-full object-cover max-w-xs max-h-xs rounded-lg bg-neutral-50 dark:bg-neutral-900"
        :src="img"
        alt="Card Image"
      />
    </div>
    <div v-if="title || description">
      <div v-if="title">
        <h2 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
          {{ title }}
        </h2>
      </div>
      <div v-if="description">
        <p class="text-neutral-600 dark:text-neutral-300">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id?: number;
  img?: string;
  title?: string;
  description?: string;
}>();
</script>

<style scoped></style>
