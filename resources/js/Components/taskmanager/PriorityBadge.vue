<!-- components/PriorityBadge.vue -->
<template>
  <span
    class="inline-flex items-center gap-1 px-2 py-1 text-sm font-medium border rounded-full"
    :class="config.className"
  >
    <component :is="config.icon" class="w-3 h-3" />
    {{ config.label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { AlertCircle, Minus, ArrowUp } from "lucide-vue-next";

type TaskPriority = "low" | "medium" | "high";

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const props = defineProps<PriorityBadgeProps>();

const priorityConfig = {
  low: {
    label: "Low",
    icon: Minus,
    className:
      "bg-brand-green/20 text-brand-green border border-brand-green/30 hover:bg-brand-green/30",
  },
  medium: {
    label: "Medium",
    icon: AlertCircle,
    className:
      "bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30 hover:bg-brand-yellow/30",
  },
  high: {
    label: "High",
    icon: ArrowUp,
    className:
      "bg-brand-orange/20 text-brand-orange border border-brand-orange/30 hover:bg-brand-orange/30",
  },
};

const config = computed(() => priorityConfig[props.priority]);
</script>
