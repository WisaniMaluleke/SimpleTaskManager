<!-- resources/js/Pages/Index.vue -->
<template>
  <AuthenticatedLayout>
      <div class="flex w-full min-h-screen bg-background">
        <!-- Main Section -->
        <div class="flex flex-col flex-1">

          <!-- Main Content -->
          <main class="flex-1 p-6">
            <div class="mx-auto max-w-7xl">
              <div class="mb-6">
                <h2 class="mb-2 text-xl font-semibold">
                  {{
                    filter === "all"
                      ? "All Tasks"
                      : filter === "pending"
                      ? "Pending Tasks"
                      : filter === "in-progress"
                      ? "In Progress Tasks"
                      : "Completed Tasks"
                  }}
                </h2>
                <p class="text-muted-foreground">
                  {{ filteredTasks.length }} task{{ filteredTasks.length !== 1 ? "s" : "" }} found
                </p>
              </div>

              <TaskTable
                :tasks="filteredTasks"
                @edit="handleEditTask"
                @delete="handleDeleteTask"
              />
            </div>
          </main>
        </div>

        <!-- Task Form Modal -->
        <TaskForm
          :isOpen="isFormOpen"
          :task="editingTask"
          @close="handleFormClose"
          @submit="editingTask ? handleUpdateTask : handleAddTask"
        />
      </div>
  </AuthenticatedLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Plus } from "lucide-vue-next";
import { Task, TaskStatus } from "@/types/Task";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import TaskTable from "@/Components/taskmanager/TaskTable.vue";
import TaskForm from "@/Components/taskmanager/TaskForm.vue";

// --------------------
// Local state
// --------------------
const tasks = ref<Task[]>([]);
const filter = ref<TaskStatus | "all">("all");
const isFormOpen = ref(false);
const editingTask = ref<Task | null>(null);

// --------------------
// Derived state
// --------------------
const filteredTasks = computed(() => {
  if (filter.value === "all") return tasks.value;
  return tasks.value.filter((t) => t.status === filter.value);
});

// --------------------
// Handlers
// --------------------
const setFilter = (newFilter: TaskStatus | "all") => {
  filter.value = newFilter;
};

const handleAddTask = (task: Omit<Task, "id" | "createdAt">) => {
  tasks.value.push({
    ...task,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  });
};

const handleUpdateTask = (updated: Omit<Task, "id" | "createdAt">) => {
  if (!editingTask.value) return;
  const index = tasks.value.findIndex((t) => t.id === editingTask.value?.id);
  if (index !== -1) {
    tasks.value[index] = {
      ...tasks.value[index],
      ...updated,
    };
  }
};

const handleDeleteTask = (id: string) => {
  tasks.value = tasks.value.filter((t) => t.id !== id);
};

const handleEditTask = (task: Task) => {
  editingTask.value = task;
  isFormOpen.value = true;
};

const handleFormClose = () => {
  isFormOpen.value = false;
  editingTask.value = null;
};
</script>
