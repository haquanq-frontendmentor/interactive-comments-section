<script setup lang="ts">
import type { UserComment } from "../../types/UserComment";
import CommentThread from "./CommentThread.vue";

defineProps<{ replies: UserComment[] }>();
</script>

<template>
  <div class="relative flex pt-4 md:pt-5">
    <div class="relative top-1 bottom-1 mr-4 w-[2px] bg-gray-500 opacity-20 md:mx-8 lg:mx-[2.6875rem]"></div>
    <ul class="flex flex-col gap-4 md:gap-6">
      <CommentThread v-for="reply in replies" :comment="reply" :key="reply.id + reply.user.username" />
    </ul>
  </div>
</template>
