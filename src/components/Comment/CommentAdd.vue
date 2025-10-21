<script setup lang="ts">
import { ref } from "vue";
import { useCommentStore } from "../../stores/commentStore";
import { useUserStore } from "../../stores/userStore";
import Button from "../common/Button.vue";
import Card from "../common/Card.vue";
import Textarea from "../common/Textarea.vue";

defineProps<{ replyingToCommentId?: number; onSubmit?: () => void }>();

const { currentUser } = useUserStore();
const { addComment } = useCommentStore();
const content = ref<string>("");
</script>

<template>
  <Card>
    <form
      class="grid grid-cols-2 gap-4 md:grid-cols-[auto_1fr_auto]"
      @submit.prevent="((addComment(content, replyingToCommentId), onSubmit?.()), (content = ``))"
    >
      <img
        class="row-start-2 aspect-square w-8 self-center rounded-full md:row-start-1 md:mt-1 md:w-10 md:self-start"
        :src="`/interactive-comments-section` + currentUser.image.png"
        alt=""
      />
      <div class="col-span-2 md:col-span-1 md:col-start-2">
        <Textarea placeholder="Add a comment..." required v-model="content" />
      </div>
      <Button class="justify-self-end md:col-start-3 md:self-start" type="submit">{{
        replyingToCommentId ? "Reply" : "Send"
      }}</Button>
    </form>
  </Card>
</template>
