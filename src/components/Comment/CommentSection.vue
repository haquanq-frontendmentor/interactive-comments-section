<script setup lang="ts">
import { provide, ref, watch } from "vue";
import { useCommentStore } from "../../stores/commentStore";
import CommentAdd from "./CommentAdd.vue";
import CommentThread from "./CommentThread.vue";
import { COMMENT_SECTION_INJECT_KEY, type CommentSectionManager } from "./injects";

const { comments } = useCommentStore();

const editingCommentId = ref<number | null>(null);
const setEditingCommentId = (value: number | null) => (editingCommentId.value = value);
const replyingCommentId = ref<number | null>(null);
const setReplyingCommentId = (value: number | null) => (replyingCommentId.value = value);

provide<CommentSectionManager>(COMMENT_SECTION_INJECT_KEY, {
  editingCommentId,
  setEditingCommentId,
  replyingCommentId,
  setReplyingCommentId,
});

watch(comments, (x) => {
  console.log(x);
});
</script>

<template>
  <section class="mx-auto flex min-h-screen w-[min(100vw-2rem,45.625rem)] flex-col gap-4 py-8 md:gap-5 md:py-16">
    <h2 class="sr-only">What are people saying?</h2>
    <ul class="flex flex-col gap-4 md:gap-5">
      <CommentThread v-for="comment in comments" :comment="comment" :key="comment.id + comment.user.username" />
    </ul>
    <CommentAdd />
  </section>
</template>
