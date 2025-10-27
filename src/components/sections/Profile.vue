<template>
  <div class="flex flex-row gap-4 p-4 justify-between items-center">
    <div class="flex flex-col gap-2">
      <Row :title="profile.name">
        <template #icon>
          <UserIcon class="w-6 h-6 text-neutral-500 hover:text-neutral-600" />
        </template>
      </Row>
      <Row :description="profile.email">
        <template #icon>
          <EnvelopeIcon
            class="w-6 h-6 text-neutral-500 hover:text-neutral-600"
          />
        </template>
      </Row>
      <Row :description="profile.phone">
        <template #icon>
          <PhoneIcon class="w-6 h-6 text-neutral-500 hover:text-neutral-600" />
        </template>
      </Row>
      <Row :description="profile.address">
        <template #icon>
          <MapPinIcon class="w-6 h-6 text-neutral-500 hover:text-neutral-600" />
        </template>
      </Row>
    </div>
    <div
      class="bg-neutral-200 dark:bg-neutral-700 size-48 flex flex-row justify-center overflow-hidden rounded-full"
    >
      <img
        :src="profile.profileImg"
        alt="profile"
        class="h-full mt-2 object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Row from "../ui/Row.vue";
import { useContent } from "@/composables/useContent";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/vue/24/solid";

const { profile } = useContent();
</script>

<style scoped></style>
