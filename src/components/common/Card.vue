<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../../utils/cn";

const props = defineProps<{ class?: string }>();
const baseClasses = "rounded-lg bg-white p-4 shadow-sm/5 md:p-6";
const mergedClasses = computed(() => cn(baseClasses, props.class));
</script>

<template>
  <div :class="mergedClasses">
    <slot></slot>
  </div>
</template>
