<script setup lang="ts">
import { Teleport } from "vue";
import Button from "../common/Button.vue";

defineProps<{
  title: string;
  description: string;
  cancelLabel: string;
  continueLabel: string;
  open: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onContinue?: () => void;
}>();
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-brightness-50"
      v-if="open"
      @click.stop="onClose()"
    >
      <div
        class="relative flex max-w-100 flex-col gap-4 rounded-lg bg-white px-7 py-6"
        role="dialog"
        aria-modal="true"
        aria-describedby="dialog-description"
        aria-label="dialog-title"
        @click.stop
        @keydown="(e) => e.key === `Escape` && onClose()"
      >
        <h2 class="text-xl leading-6 font-medium text-gray-800" id="dialog-title">{{ title }}</h2>
        <p class="overflow-y-scroll leading-6 text-gray-500" id="dialog-description">{{ description }}</p>
        <div class="grid grid-cols-2 gap-3 *:w-full">
          <Button variant="secondary" type="button" @click="(onClose(), onCancel?.())">{{ cancelLabel }}</Button>
          <Button variant="danger" type="button" @click="(onClose(), onContinue?.())">{{ continueLabel }}</Button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
