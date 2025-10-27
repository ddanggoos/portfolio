<template>
  <div>
    <section>
      <h2 class="text-2xl font-bold mb-4">경험</h2>
      <div class="space-y-2">
        <Row
          v-for="exp in experience"
          :key="exp.id"
          :title="exp.title"
          :description="exp.description"
        >
          <template #icon>
            <BeakerIcon class="w-8 h-8 text-blue-500 hover:text-blue-600" />
          </template>
          <template #content>
            <span class="text-sm text-gray-600">{{ exp.company }}</span>
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

const { experience } = useContent();
</script>

<style scoped></style>
