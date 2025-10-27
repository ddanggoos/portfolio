<template>
  <div>
    <section>
      <h2
        class="text-neutral-800 dark:text-neutral-100 text-2xl font-bold mb-4"
      >
        프로젝트
      </h2>
      <div class="overflow-x-auto w-full">
        <div class="flex flex-row gap-4 p-4 min-w-max">
          <Card
            v-for="project in projects"
            :key="project.id"
            :img="project.img ?? undefined"
            :title="project.title"
            :description="project.description"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Card from "../ui/Card.vue";
import { useContent } from "@/composables/useContent";

const { projects } = useContent();
</script>

<style scoped></style>
