<template>
  <div class="w-full flex flex-row items-center gap-4 p-2">
    <!-- 이미지 슬롯 -->
    <div class="size-16" v-if="img">
      <img
        class="w-full h-full object-cover max-w-xs max-h-xs rounded-full bg-neutral-50 dark:bg-neutral-900"
        :src="img"
        alt="Row Image"
      />
    </div>

    <!-- 아이콘 슬롯 -->
    <div v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>

    <!-- 내용 영역 -->
    <div class="flex flex-row items-center gap-2">
      <div v-if="title">
        <h2 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
          {{ title }}
        </h2>
      </div>
      <div v-if="title && description">
        <MinusIcon class="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
      </div>
      <div v-if="description">
        <p class="text-xl text-neutral-600 dark:text-neutral-300">
          {{ description }}
        </p>
      </div>
    </div>

    <!-- 추가 컨텐츠 슬롯 -->
    <div v-if="$slots.content" class="ml-auto">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BeakerIcon, MinusIcon } from "@heroicons/vue/24/outline";
defineProps<{
  img?: string;
  title?: string;
  description?: string;
}>();
</script>

<style scoped></style>
