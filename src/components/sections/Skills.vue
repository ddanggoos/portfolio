<template>
  <div>
    <section>
      <h2
        class="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-100"
      >
        스킬
      </h2>
      <div class="space-y-2">
        <Row
          v-for="skill in skills"
          :key="skill.id"
          :title="skill.title"
          :description="skill.description"
        >
          <template #icon>
            <BeakerIcon
              class="size-10 text-neutral-600 dark:text-neutral-300"
            />
          </template>
          <template #content>
            <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
              {{ skill.level }}
            </span>
          </template>
        </Row>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Row from "../ui/Row.vue";
import { useContent } from "@/composables/useContent";
import { BeakerIcon } from "@heroicons/vue/24/solid";

const { skills } = useContent();
</script>

<style scoped></style>
