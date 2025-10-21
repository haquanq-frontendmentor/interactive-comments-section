<script setup lang="ts">
import { computed } from "vue";
import { MinusIcon, PlusIcon } from "../../assets/images";
import { useCommentStore } from "../../stores/commentStore";
import { useUserStore } from "../../stores/userStore";
import { cn } from "../../utils/cn";

const { commentId, score } = defineProps<{ commentId: number; score: number }>();

const baseClass =
  "aspect-square focus:outline-2 aria-selected:text-purple-600 aria-selected:[&_svg]:scale-110 focus:-outline-offset-2 focus:outline-purple-600 h-10 transition-colors rounded-[inherit] flex items-center justify-center text-purple-200";

const upvoteButtonClass = computed(() => cn(baseClass, {}));
const downvoteButtonClass = computed(() => cn(baseClass, {}));

const { votedComments } = useUserStore();
const { upvoteComment, downvoteComment } = useCommentStore();
</script>

<template>
  <div
    class="flex h-10 w-25 items-center justify-between rounded-lg bg-gray-50 inset-shadow-sm md:h-25 md:w-10 md:flex-col"
  >
    <button
      :class="upvoteButtonClass"
      type="button"
      aria-label="Upvote"
      :aria-pressed="votedComments[commentId] === `upvote`"
      @click="upvoteComment(commentId)"
    >
      <PlusIcon />
    </button>
    <span class="font-medium text-purple-600" aria-live="polite">{{ score }}</span>
    <button
      :class="downvoteButtonClass"
      type="button"
      aria-label="Downvote"
      :aria-pressed="votedComments[commentId] === `downvote`"
      @click="downvoteComment(commentId)"
    >
      <MinusIcon />
    </button>
  </div>
</template>
