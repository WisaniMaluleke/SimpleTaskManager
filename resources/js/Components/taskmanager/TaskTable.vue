<template>
    <div class="task-table-container">
        <!-- Empty State -->
        <div v-if="tasks.length === 0" class="empty-state">
            <div class="empty-state-icon">
                <div class="empty-state-badge">
                    <span class="checkmark">✓</span>
                </div>
            </div>
            <h3 class="empty-state-title">No tasks found</h3>
            <p class="empty-state-description">Start by adding your first task!</p>
        </div>

        <!-- Desktop Table View -->
        <div v-else class="table-wrapper desktop-view">
            <table class="task-table">
                <thead class="table-header">
                    <tr class="header-row">
                        <th class="header-cell">Task</th>
                        <th class="header-cell">Status</th>
                        <th class="header-cell">Priority</th>
                        <th class="header-cell">Due Date</th>
                        <th class="header-cell actions-header"></th>
                    </tr>
                </thead>
                <tbody class="table-body">
                    <tr v-for="(task, index) in tasks" :key="task.id"
                        :class="['table-row', { 'row-even': index % 2 === 0 }]">
                        <td class="table-cell task-cell">
                            <div class="task-info">
                                <span class="task-title">{{ task.title }}</span>
                                <span class="task-date">
                                    Created {{ formatDate(task.createdAt) }}
                                </span>
                            </div>
                        </td>
                        <td class="table-cell">
                            <StatusBadge :status="task.status" />
                        </td>
                        <td class="table-cell">
                            <PriorityBadge :priority="task.priority" />
                        </td>
                        <td class="table-cell due-date-cell">
                            <div class="due-date-info">
                                <span class="due-date">{{ formatDate(task.dueDate) }}</span>
                                <span class="due-status">
                                    {{ isOverdue(task.dueDate) ? 'Overdue' : 'Upcoming' }}
                                </span>
                            </div>
                        </td>
                        <td class="table-cell actions-cell">
                            <div class="dropdown-wrapper">
                                <button class="dropdown-trigger" @click="toggleDropdown(task.id)"
                                    :class="{ 'active': openDropdown === task.id }">
                                    <MoreHorizontal :size="16" />
                                </button>
                                <div v-if="openDropdown === task.id" class="dropdown-menu" @click.stop>
                                    <button class="dropdown-item edit-item" @click="handleEdit(task)">
                                        <Edit :size="16" />
                                        Edit
                                    </button>
                                    <button class="dropdown-item delete-item" @click="handleDelete(task.id)">
                                        <Trash2 :size="16" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Mobile Card View -->
        <div v-if="tasks.length > 0" class="mobile-view">
            <div class="mobile-tasks-grid">
                <div v-for="task in tasks" :key="task.id" class="mobile-task-card">
                    <!-- Card Header -->
                    <div class="mobile-card-header">
                        <div class="mobile-task-info">
                            <h3 class="mobile-task-title">{{ task.title }}</h3>
                            <span class="mobile-task-date">
                                Created {{ formatDate(task.createdAt) }}
                            </span>
                        </div>
                        <div class="mobile-actions">
                            <div class="dropdown-wrapper">
                                <button class="dropdown-trigger" @click="toggleDropdown(task.id)"
                                    :class="{ 'active': openDropdown === task.id }">
                                    <MoreHorizontal :size="18" />
                                </button>
                                <div v-if="openDropdown === task.id" class="dropdown-menu mobile-dropdown" @click.stop>
                                    <button class="dropdown-item edit-item" @click="handleEdit(task)">
                                        <Edit :size="16" />
                                        Edit
                                    </button>
                                    <button class="dropdown-item delete-item" @click="handleDelete(task.id)">
                                        <Trash2 :size="16" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Card Content -->
                    <div class="mobile-card-content">
                        <div class="mobile-field">
                            <span class="mobile-field-label">Status</span>
                            <StatusBadge :status="task.status" />
                        </div>
                        <div class="mobile-field">
                            <span class="mobile-field-label">Priority</span>
                            <PriorityBadge :priority="task.priority" />
                        </div>
                        <div class="mobile-field">
                            <span class="mobile-field-label">Due Date</span>
                            <div class="mobile-due-date">
                                <span class="mobile-due-date-text">{{ formatDate(task.dueDate) }}</span>
                                <span class="mobile-due-status" :class="{ 'overdue': isOverdue(task.dueDate) }">
                                    {{ isOverdue(task.dueDate) ? 'Overdue' : 'Upcoming' }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Stats -->
        <div v-if="tasks.length > 0" class="table-footer">
            <p class="total-tasks">
                Total tasks: <span class="task-count">{{ tasks.length }}</span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { MoreHorizontal, Edit, Trash2 } from 'lucide-vue-next'
import StatusBadge from './StatusBadge.vue'
import PriorityBadge from './PriorityBadge.vue'

const props = defineProps({
    tasks: {
        type: Array,
        required: true,
        default: () => []
    }
})

const emit = defineEmits(['edit', 'delete'])

const openDropdown = ref(null)

const formatDate = (dateString) => {
    try {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        })
    } catch {
        return dateString
    }
}

const isOverdue = (dateString) => {
    return new Date(dateString) < new Date()
}

const toggleDropdown = (taskId) => {
    openDropdown.value = openDropdown.value === taskId ? null : taskId
}

const handleEdit = (task) => {
    emit('edit', task)
    openDropdown.value = null
}

const handleDelete = (taskId) => {
    emit('delete', taskId)
    openDropdown.value = null
}

const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown-wrapper')) {
        openDropdown.value = null
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.task-table-container {
    border-radius: 12px;
    border: 1px solid hsl(var(--border));
    background: hsl(var(--card));
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Empty State */
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1.5rem;
    text-align: center;
}

.empty-state-icon {
    padding: 1.5rem;
    background: hsl(var(--muted));
    border-radius: 50%;
    margin-bottom: 1rem;
}

.empty-state-badge {
    width: 3rem;
    height: 3rem;
    background: linear-gradient(131deg, #CF5EBD 29%, #CA10FB 87%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.checkmark {
    color: white;
    font-weight: bold;
    font-size: 1.25rem;
}

.empty-state-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: hsl(var(--foreground));
}

.empty-state-description {
    color: hsl(var(--muted-foreground));
}

/* Desktop Table Styles */
.desktop-view {
    display: block;
}

.mobile-view {
    display: none;
}

.table-wrapper {
    overflow: hidden;
}

.task-table {
    width: 100%;
    border-collapse: collapse;
}

.table-header {
    background: linear-gradient(131deg, #CF5EBD 29%, #CA10FB 87%);
}

.header-row {
    border: none;
}

.header-cell {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: white;
    font-size: 0.875rem;
}

.actions-header {
    width: 50px;
}

.table-body {
    background: hsl(var(--background));
}

.table-row {
    border-bottom: 1px solid hsl(var(--border) / 0.5);
    transition: background-color 0.2s ease;
}

.table-row:hover {
    background: hsl(var(--muted) / 0.5);
}

.row-even {
    background: hsl(var(--background));
}

.row-even:not(:hover) {
    background: hsl(var(--muted) / 0.3);
}

.table-cell {
    padding: 1rem;
    vertical-align: top;
}

/* Task Cell */
.task-info {
    display: flex;
    flex-direction: column;
}

.task-title {
    font-weight: 600;
    color: hsl(var(--foreground));
    margin-bottom: 0.25rem;
}

.task-date {
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
}

/* Due Date Cell */
.due-date-info {
    display: flex;
    flex-direction: column;
}

.due-date {
    font-weight: 500;
    color: hsl(var(--foreground));
    margin-bottom: 0.25rem;
}

.due-status {
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
}

/* Actions Cell */
.actions-cell {
    position: relative;
}

.dropdown-wrapper {
    position: relative;
    display: inline-block;
}

.dropdown-trigger {
    height: 2rem;
    width: 2rem;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
    color: hsl(var(--muted-foreground));
}

.dropdown-trigger:hover,
.dropdown-trigger.active {
    background: hsl(var(--muted));
    color: hsl(var(--foreground));
}

.dropdown-menu {
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 0.25rem;
    min-width: 120px;
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    z-index: 50;
    overflow: hidden;
}

.dropdown-item {
    width: 100%;
    padding: 0.75rem;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.2s ease;
    color: hsl(var(--foreground));
    font-size: 0.875rem;
}

.dropdown-item:hover {
    background: hsl(var(--muted));
}

.delete-item {
    color: hsl(var(--destructive));
}

.delete-item:hover {
    background: hsl(var(--destructive) / 0.1);
}

/* Mobile Card Styles */
.mobile-tasks-grid {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.mobile-task-card {
    background: hsl(var(--background));
    border: 1px solid hsl(var(--border));
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s ease;
}

.mobile-task-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-color: hsl(var(--border) / 0.8);
}

.mobile-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1rem;
    background: hsl(var(--muted) / 0.3);
    border-bottom: 1px solid hsl(var(--border));
}

.mobile-task-info {
    flex: 1;
}

.mobile-task-title {
    font-size: 1rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    margin: 0 0 0.25rem 0;
    line-height: 1.4;
}

.mobile-task-date {
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
}

.mobile-actions {
    margin-left: 1rem;
}

.mobile-dropdown {
    right: 0;
    left: auto;
}

.mobile-card-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
}

.mobile-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 1.5rem;
}

.mobile-field-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(var(--muted-foreground));
}

.mobile-due-date {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
}

.mobile-due-date-text {
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(var(--foreground));
    margin-bottom: 0.125rem;
}

.mobile-due-status {
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
}

.mobile-due-status.overdue {
    color: hsl(var(--destructive));
    font-weight: 500;
}

/* Table Footer */
.table-footer {
    background: hsl(var(--muted) / 0.3);
    padding: 0.75rem 1.5rem;
    border-top: 1px solid hsl(var(--border));
}

.total-tasks {
    font-size: 0.875rem;
    color: hsl(var(--muted-foreground));
    margin: 0;
}

.task-count {
    font-weight: 600;
    color: hsl(var(--foreground));
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {

    .header-cell,
    .table-cell {
        padding: 0.875rem;
    }

    .task-table {
        font-size: 0.875rem;
    }
}

@media (max-width: 768px) {
    .desktop-view {
        display: none;
    }

    .mobile-view {
        display: block;
    }

    .task-table-container {
        border-radius: 8px;
    }

    .table-footer {
        padding: 0.75rem 1rem;
    }
}

@media (max-width: 640px) {
    .empty-state {
        padding: 2rem 1rem;
    }

    .mobile-tasks-grid {
        padding: 0.75rem;
        gap: 0.75rem;
    }

    .mobile-card-header {
        padding: 0.875rem;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }

    .mobile-actions {
        margin-left: 0;
        align-self: flex-end;
        margin-top: -0.5rem;
    }

    .mobile-card-content {
        padding: 0.875rem;
        gap: 0.75rem;
    }

    .mobile-field {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.375rem;
    }

    .mobile-due-date {
        align-items: flex-start;
        text-align: left;
    }

    .table-footer {
        padding: 0.625rem 0.75rem;
    }
}

/* Extra small devices */
@media (max-width: 480px) {
    .empty-state {
        padding: 1.5rem 0.75rem;
    }

    .empty-state-title {
        font-size: 1rem;
    }

    .mobile-task-title {
        font-size: 0.925rem;
    }

    .mobile-tasks-grid {
        padding: 0.5rem;
        gap: 0.625rem;
    }
}
</style>
