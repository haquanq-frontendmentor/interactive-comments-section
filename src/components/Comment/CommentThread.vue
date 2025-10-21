<script setup lang="ts">
import { inject } from "vue";
import type { UserComment } from "../../types/UserComment";
import Card from "../common/Card.vue";
import CommentAdd from "./CommentAdd.vue";
import CommentThreadAction from "./CommentThreadAction.vue";
import CommentThreadContent from "./CommentThreadContent.vue";
import CommentThreadHeader from "./CommentThreadHeader.vue";
import CommentThreadReply from "./CommentThreadReply.vue";
import CommentThreadVote from "./CommentThreadVote.vue";
import { COMMENT_SECTION_INJECT_KEY, type CommentSectionManager } from "./injects";

defineProps<{ comment: UserComment; parentCommentId?: number }>();

const commentSectionManager = inject<CommentSectionManager>(COMMENT_SECTION_INJECT_KEY);
if (!commentSectionManager) throw new Error("Commen section manager injection not provided.");
</script>

<template>
  <li>
    <div>
      <Card
        class="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr] md:gap-y-[0.9375rem]"
      >
        <div class="col-span-2 md:col-span-1 md:col-start-2">
          <CommentThreadHeader :comment="comment" />
        </div>
        <div class="col-span-2 md:col-start-2">
          <CommentThreadContent :comment="comment" />
        </div>
        <div class="md:row-span-2 md:row-start-1">
          <CommentThreadVote :comment-id="comment.id" :score="comment.score" />
        </div>
        <div class="self-center justify-self-end md:col-start-3 md:row-start-1">
          <CommentThreadAction :comment="comment" />
        </div>
      </Card>
      <div class="pt-2" v-if="commentSectionManager.replyingCommentId.value === comment.id">
        <CommentAdd :replying-to-comment-id="comment.id" @submit="commentSectionManager.setReplyingCommentId(null)" />
      </div>
    </div>

    <CommentThreadReply v-if="comment.replies && comment.replies.length !== 0" :replies="comment.replies" />
  </li>
</template>
