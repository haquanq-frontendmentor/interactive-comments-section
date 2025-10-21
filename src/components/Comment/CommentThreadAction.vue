<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { DeleteIcon, EditIcon, ReplyIcon } from "../../assets/images";
import { useCommentStore } from "../../stores/commentStore";
import { useUserStore } from "../../stores/userStore";
import type { UserComment } from "../../types/UserComment";
import { cn } from "../../utils/cn";
import ConfirmDialog from "../Dialog/ConfirmDialog.vue";
import { COMMENT_SECTION_INJECT_KEY, type CommentSectionManager } from "./injects";

defineProps<{ comment: UserComment }>();

const baseClass =
  "flex gap-2 focus-visible:outline-offset-3 focus-visible:outline-3 focus-visible:outline-purple-600 focus-visible:outline-dashed rounded-sm items-center justify-center hover:opacity-50 transition-opacity leading-6 font-medium text-purple-600";

const replyButtonClass = computed(() => cn(baseClass));
const deleteButtonClass = computed(() => cn(baseClass, "text-pink-400"));
const editButtonClass = computed(() => cn(baseClass));

const { currentUser } = useUserStore();
const { removeComment } = useCommentStore();
const deleteConfirmDialogOpen = ref<boolean>(false);

const commentSectionManager = inject<CommentSectionManager>(COMMENT_SECTION_INJECT_KEY);
if (!commentSectionManager) throw new Error("Commen section manager injection not provided.");
</script>

<template>
  <div class="flex items-center gap-5">
    <button
      :class="replyButtonClass"
      type="button"
      v-if="currentUser.username !== comment.user.username"
      @click="
        commentSectionManager.replyingCommentId.value === comment.id
          ? commentSectionManager.setReplyingCommentId(null)
          : commentSectionManager.setReplyingCommentId(comment.id)
      "
    >
      <ReplyIcon />
      <span>Reply</span>
    </button>
    <button
      :class="deleteButtonClass"
      type="button"
      v-if="currentUser.username === comment.user.username"
      @click="deleteConfirmDialogOpen = true"
    >
      <DeleteIcon />
      <span>Delete</span>
    </button>
    <button
      :class="editButtonClass"
      type="button"
      v-if="currentUser.username === comment.user.username"
      @click="
        commentSectionManager.editingCommentId.value === comment.id
          ? commentSectionManager.setEditingCommentId(null)
          : commentSectionManager.setEditingCommentId(comment.id)
      "
    >
      <EditIcon />
      <span>Edit</span>
    </button>
    <ConfirmDialog
      title="Delete comment"
      description="Are you sure you want to delete this comment? This will remove the comment and can't be undone."
      cancel-label="no, cancel"
      continue-label="yes, delete"
      :open="deleteConfirmDialogOpen"
      @close="deleteConfirmDialogOpen = false"
      @continue="removeComment(comment.id)"
    />
  </div>
</template>
