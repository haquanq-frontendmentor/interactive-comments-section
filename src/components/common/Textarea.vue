<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = defineProps<{ class?: string }>();
const baseClass =
  "h-24 rounded-lg focus:outline-2 resize-none focus:outline-offset-2 focus:outline-purple-600 px-6 py-3 w-full leading-6 inset-ring inset-ring-gray-200 transition-[box-shadow] placeholder:text-gray-500 hover:inset-ring-purple-600 ";
const mergedClass = computed(() => cn(baseClass, props.class));

const model = defineModel<string>();
</script>

<template>
  <textarea :class="mergedClass" v-model="model" />
</template>
