<!-- components/TaskForm.vue -->
<template>
  <Dialog :open="isOpen" @update:open="handleClose">
    <DialogContent class="sm:max-w-[425px]">
      <form @submit.prevent="handleSubmit">
        <DialogHeader>
          <DialogTitle class="text-xl font-bold text-transparent bg-gradient-primary bg-clip-text">
            {{ task ? "Edit Task" : "Add New Task" }}
          </DialogTitle>
          <DialogDescription>
            {{ task ? "Update your task details below." : "Create a new task to get started." }}
          </DialogDescription>
        </DialogHeader>

        <div class="grid gap-4 py-4">
          <!-- Title -->
          <div class="grid gap-2">
            <Label for="title" class="font-medium">Task Title</Label>
            <Input
              id="title"
              v-model="title"
              placeholder="Enter task title..."
              required
              class="focus:ring-primary"
            />
          </div>

          <!-- Status + Priority -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Status -->
            <div class="grid gap-2">
              <Label for="status" class="font-medium">Status</Label>
              <Select v-model="status">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <!-- Priority -->
            <div class="grid gap-2">
              <Label for="priority" class="font-medium">Priority</Label>
              <Select v-model="priority">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <!-- Due Date -->
          <div class="grid gap-2">
            <Label for="dueDate" class="font-medium">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              v-model="dueDate"
              required
              class="focus:ring-primary"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" @click="handleClose">Cancel</Button>
          <Button type="submit" class="bg-gradient-primary hover:opacity-90">
            {{ task ? "Update Task" : "Add Task" }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Task, TaskStatus, TaskPriority } from "@/types/Task";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/taskmanager/ui/sidebar"; // adjust imports if you don’t barrel-export

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id" | "createdAt">) => void;
  task?: Task | null;
}

const props = defineProps<TaskFormProps>();

// Local state (Vue ref equivalents of React useState)
const title = ref(props.task?.title ?? "");
const status = ref<TaskStatus>(props.task?.status ?? "pending");
const priority = ref<TaskPriority>(props.task?.priority ?? "medium");
const dueDate = ref(
  props.task?.dueDate ? new Date(props.task.dueDate).toISOString().split("T")[0] : ""
);

// Watch for when task changes (e.g., editing different task)
watch(
  () => props.task,
  (newTask) => {
    title.value = newTask?.title ?? "";
    status.value = newTask?.status ?? "pending";
    priority.value = newTask?.priority ?? "medium";
    dueDate.value = newTask?.dueDate
      ? new Date(newTask.dueDate).toISOString().split("T")[0]
      : "";
  },
  { immediate: true }
);

const handleSubmit = () => {
  if (!title.value.trim() || !dueDate.value) return;

  props.onSubmit({
    title: title.value.trim(),
    status: status.value,
    priority: priority.value,
    dueDate: new Date(dueDate.value).toISOString(),
  });

  // Reset form
  title.value = "";
  status.value = "pending";
  priority.value = "medium";
  dueDate.value = "";
  props.onClose();
};

const handleClose = () => {
  // Reset to current task values
  title.value = props.task?.title ?? "";
  status.value = props.task?.status ?? "pending";
  priority.value = props.task?.priority ?? "medium";
  dueDate.value = props.task?.dueDate
    ? new Date(props.task.dueDate).toISOString().split("T")[0]
    : "";
  props.onClose();
};
</script>
