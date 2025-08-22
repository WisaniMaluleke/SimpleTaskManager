<!-- components/StatusBadge.vue -->
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
import { CheckCircle, Clock, PlayCircle } from "lucide-vue-next";

type TaskStatus = "pending" | "in-progress" | "completed";

interface StatusBadgeProps {
  status: TaskStatus;
}

const props = defineProps<StatusBadgeProps>();

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    className:
      "bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30 hover:bg-brand-yellow/30",
  },
  "in-progress": {
    label: "In Progress",
    icon: PlayCircle,
    className:
      "bg-brand-inprogress/20 text-brand-inprogress border border-brand-inprogress/30 hover:bg-brand-inprogress/30",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    className:
      "bg-brand-success/20 text-brand-success border border-success/30 hover:bg-brand-success/30",
  },
};

const config = computed(() => statusConfig[props.status]);
</script>
