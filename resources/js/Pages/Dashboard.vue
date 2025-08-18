<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

// Mock task data
const tasks = [
    { id: 1, title: 'Finish API docs', status: 'In Progress', priority: 'High', due: 'Aug 22' },
    { id: 2, title: 'Design dashboard', status: 'Completed', priority: 'Medium', due: 'Aug 10' },
    { id: 3, title: 'Client meeting prep', status: 'Pending', priority: 'High', due: 'Aug 25' },
];
</script>

<template>

    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <!-- Full-screen background -->
        <div class="min-h-screen px-6 py-10 page-bg">
            <div class="mx-auto space-y-8 max-w-7xl">

                <div class="flex items-center justify-between py-4 text-gray-500 shadow-md px-9">
                    <h2 class="text-2xl font-bold tracking-wide">
                        Task Manager Dashboard
                    </h2>
                </div>

                <!-- Stats cards -->
                <div class="grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div class="p-6 bg-white border-2 shadow rounded-2xl border-wis-yellow">
                        <p class="text-sm text-wis-yellow">Total Tasks</p>
                        <p class="text-2xl font-bold text-wis-yellow">{{ tasks.length }}</p>
                    </div>
                    <div class="p-6 bg-white border-2 shadow border-wis-teal rounded-2xl">
                        <p class="text-sm text-wis-teal">In Progress</p>
                        <p class="text-2xl font-bold text-wis-teal">
                            {{tasks.filter(t => t.status === 'In Progress').length}}
                        </p>
                    </div>
                    <div class="p-6 bg-white border-2 shadow border-wis-green rounded-2xl">
                        <p class="text-sm text-wis-green">Completed</p>
                        <p class="text-2xl font-bold text-wis-green">
                            {{tasks.filter(t => t.status === 'Completed').length}}
                        </p>
                    </div>
                    <div class="p-6 bg-white border-2 shadow rounded-2xl border-wis-pink">
                        <p class="text-sm text-wis-pink">Overdue</p>
                        <p class="text-2xl font-bold text-wis-pink">1</p>
                    </div>
                </div>

                <!-- Task List -->
                <div class="overflow-hidden bg-white border-2 shadow-lg rounded-2xl border-wis-teal">
                    <div class="p-6">
                        <h3 class="mb-4 text-lg font-semibold text-wis-purple">Tasks</h3>
                        <table class="w-full overflow-hidden text-sm text-left border-collapse">
                            <!-- Table Header -->
                            <thead
                                class="text-xs text-gray-800 uppercase border border-gray-700">
                                <tr>
                                    <th class="px-4 py-3 border border-gray-800">Task</th>
                                    <th class="px-4 py-3 border border-gray-800">Status</th>
                                    <th class="px-4 py-3 border border-gray-800">Priority</th>
                                    <th class="px-4 py-3">Due Date</th>
                                </tr>
                            </thead>

                            <!-- Table Body -->
                            <tbody>
                                <tr v-for="task in tasks" :key="task.id"
                                    class="transition odd:bg-gray-50 even:bg-wis-neutral">
                                    <!-- Task Title -->
                                    <td class="px-4 py-3 font-medium text-gray-800 border border-gray-700">
                                        {{ task.title }}
                                    </td>

                                    <!-- Task Status -->
                                    <td class="px-4 py-3 border border-gray-700">
                                        <span :class="{
                                            'px-2 py-1 rounded-full text-xs font-semibold shadow-sm': true,
                                            'bg-wis-yellow text-gray-900': task.status === 'Pending',
                                            'bg-wis-blue text-white': task.status === 'In Progress',
                                            'bg-wis-green text-white': task.status === 'Completed',
                                        }">
                                            {{ task.status }}
                                        </span>
                                    </td>

                                    <!-- Task Priority -->
                                    <td class="px-4 py-3 border border-gray-700">
                                        <span :class="{
                                            'text-wis-pink font-bold': task.priority === 'High',
                                            'text-wis-orange font-semibold': task.priority === 'Medium',
                                            'text-wis-green font-semibold': task.priority === 'Low',
                                        }">
                                            {{ task.priority }}
                                        </span>
                                    </td>

                                    <!-- Due Date -->
                                    <td class="px-4 py-3 text-gray-700 border border-gray-700">
                                        {{ task.due }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </div>
    </AuthenticatedLayout>
</template>
