<script setup lang="ts">
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { SidebarTrigger, SidebarProvider } from '@/Components/taskmanager/ui/sidebar';
import TaskSidebar from '@/Components/taskmanager/TaskSidebar.vue';

// Refs
const showingNavigationDropdown = ref(false); // mobile nav dropdown
const sidebarOpen = ref(false); // sidebar toggle
const filter = ref("all"); // task filter for sidebar

// Sidebar toggle
const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
    showingNavigationDropdown.value = !showingNavigationDropdown;
};

// Sidebar filter change
const setFilter = (newFilter: string) => {
    filter.value = newFilter;
};
</script>

<template>
    <SidebarProvider>
        <div class="flex min-h-screen bg-background">
            <!-- Main content -->
            <div class="flex flex-col flex-1 min-h-screen">
                <!-- Navbar -->
                <nav class="flex items-center justify-between px-6 py-4 shadow-md bg-gradient-header">
                    <!-- Left: Logo -->
                    <div class="flex items-center flex-1">
                        <Link :href="route('dashboard')" class="flex items-center gap-2">
                        <ApplicationLogo class="w-10 h-10" />
                        </Link>
                    </div>

                    <!-- Center: Page Title -->
                    <div class="flex-1 text-center">
                        <span class="text-xl font-bold text-white">SimpleTaskManager</span>
                    </div>

                    <!-- Right: User Dropdown -->
                    <div class="flex items-center justify-end flex-1">
                        <!-- Desktop Dropdown -->
                        <div class="items-center hidden sm:flex">
                            <Dropdown align="right" width="48">
                                <template #trigger>
                                    <button
                                        class="inline-flex items-center px-3 py-2 font-medium text-white rounded hover:bg-white/20 focus:outline-none">
                                        {{ $page.props.auth.user.name }}
                                        <svg class="w-4 h-4 ms-2" xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </template>
                                <template #content>
                                    <DropdownLink :href="route('profile.edit')">Profile</DropdownLink>
                                    <DropdownLink :href="route('logout')" method="post" as="button">Log Out
                                    </DropdownLink>
                                </template>
                            </Dropdown>
                        </div>

                        <!-- Mobile Hamburger -->
                        <div class="sm:hidden">
                            <button @click="toggleSidebar"
                                class="p-2 text-white rounded hover:bg-white/20 focus:outline-none">
                                <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        :class="{ hidden: showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown }"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                    <path
                                        :class="{ hidden: !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>

                <!-- Mobile Menu -->
                <div :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }"
                    class="px-4 py-2 sm:hidden bg-white/10">
                    <ResponsiveNavLink :href="route('dashboard')" :active="route().current('dashboard')">Dashboard
                    </ResponsiveNavLink>
                    <ResponsiveNavLink :href="route('profile.edit')">Profile</ResponsiveNavLink>
                    <ResponsiveNavLink :href="route('logout')" method="post" as="button">Log Out</ResponsiveNavLink>
                </div>


                <!-- Page Header -->
                <header v-if="$slots.header" class="px-6 py-4">
                    <slot name="header" />
                </header>

                <!-- Page Content -->

                <!-- Body: Sidebar + Main -->
                <div class="flex flex-1">
                    <!-- Sidebar -->
                    <div>
                        <TaskSidebar :activeFilter="filter" @filter-change="setFilter"
                            :class="{ 'hidden sm:block': !sidebarOpen }" />
                    </div>

                    <!-- Main Content -->
                    <main class="flex-1 px-6 py-4">
                        <slot />
                    </main>
                </div>
            </div>
        </div>
    </SidebarProvider>
</template>
