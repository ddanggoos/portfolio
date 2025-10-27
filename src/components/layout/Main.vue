<template>
  <div class="bg-neutral-100 dark:bg-neutral-900 min-h-screen">
    <MainHeader />
    <div class="max-w-4xl mx-auto space-y-8 p-8" style="margin-top: 1500px">
      <Profile />

      <!-- 프로젝트 섹션 -->
      <Project />

      <!-- 스킬 섹션 -->
      <Skills />

      <!-- 경험 섹션 -->
      <Experience />
    </div>
  </div>
</template>

<script setup lang="ts">
import Project from "../sections/Project.vue";
import Skills from "../sections/Skills.vue";
import Experience from "../sections/Experience.vue";
import Profile from "../sections/Profile.vue";
import MainHeader from "../sections/MainHeader.vue";
</script>

<style scoped></style>
