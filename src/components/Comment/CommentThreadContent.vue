<script setup lang="ts">
import { inject, ref, watch } from "vue";
import { useCommentStore } from "../../stores/commentStore";
import type { UserComment } from "../../types/UserComment";
import Button from "../common/Button.vue";
import Textarea from "../common/Textarea.vue";
import { COMMENT_SECTION_INJECT_KEY, type CommentSectionManager } from "./injects";

const { comment } = defineProps<{ comment: UserComment }>();

const content = ref<string>(comment.content);
const { updateComment } = useCommentStore();

const commentSectionManager = inject<CommentSectionManager>(COMMENT_SECTION_INJECT_KEY);
if (!commentSectionManager) throw new Error("Commen section manager injection not provided.");

watch(commentSectionManager.editingCommentId, (v) => {
  if (v === null) content.value = comment.content;
});
</script>

<template>
  <div>
    <p class="leading-6 text-gray-500" v-if="!(commentSectionManager.editingCommentId.value === comment.id)">
      <span class="font-medium text-purple-600" v-if="comment.replyingTo"> {{ "@" + comment.replyingTo }}&nbsp;</span>
      <span> {{ comment.content }} </span>
    </p>
    <form
      class="flex flex-col items-end gap-4"
      v-if="commentSectionManager.editingCommentId.value === comment.id"
      @submit.prevent="(updateComment(comment.id, content), commentSectionManager.setEditingCommentId(null))"
    >
      <Textarea v-model="content" />
      <Button class="" type="submit">Update</Button>
    </form>
  </div>
</template>
