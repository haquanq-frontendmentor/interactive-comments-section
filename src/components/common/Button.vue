<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const { variant = "primary", ...props } = defineProps<{
  class?: string;
  variant?: "primary" | "secondary" | "danger";
}>();

const baseClass =
  "w-26 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 pt-[0.9375rem] pb-4 text-[1.0625rem] font-medium tracking-[-0.05em] text-white uppercase transition-opacity hover:opacity-50";
const mergedClass = computed(() =>
  cn(
    baseClass,
    {
      "focus-visible:outline-purple-600 bg-purple-600": variant === "primary",
      "focus-visible:outline-gray-500 bg-gray-500": variant === "secondary",
      "focus-visible:outline-pink-400 bg-pink-400": variant === "danger",
    },
    props.class,
  ),
);
</script>

<template>
  <button :class="mergedClass">
    <slot></slot>
  </button>
</template>
