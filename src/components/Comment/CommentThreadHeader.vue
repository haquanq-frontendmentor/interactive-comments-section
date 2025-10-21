<script setup lang="ts">
import { useUserStore } from "../../stores/userStore";
import type { UserComment } from "../../types/UserComment";

const { comment } = defineProps<{ comment: UserComment }>();
const { currentUser } = useUserStore();
</script>

<template>
  <div class="flex items-center gap-4">
    <img
      class="aspect-square h-8 rounded-full"
      :src="'/interactive-comments-section' + comment.user.image.png"
      alt=""
    />
    <p class="flex items-center gap-2 font-medium text-gray-800">
      <span> {{ comment.user.username }} </span>
      <span
        class="rounded-sm bg-purple-600 px-[0.375rem] pt-[0.125rem] pb-1 text-[0.8125rem] font-medium text-white"
        v-if="currentUser.username === comment.user.username"
        >You</span
      >
    </p>
    <p class="text-gray-500">{{ comment.createdAt }}</p>
  </div>
</template>
