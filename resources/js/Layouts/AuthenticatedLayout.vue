<script setup lang="ts">
import { ref, watch } from 'vue'
import { Link } from '@inertiajs/vue3'
import ApplicationLogo from '@/Components/ApplicationLogo.vue'
import Dropdown from '@/Components/Dropdown.vue'
import DropdownLink from '@/Components/DropdownLink.vue'
import { SidebarProvider, SidebarTrigger } from '@/Components/taskmanager/ui/sidebar'
import TaskSidebar from '@/Components/taskmanager/TaskSidebar.vue'
import logo from '../../images/logo.png'

const sidebarOpen = ref(false)
const filter = ref('all')

// Close sidebar on resize > small screens
watch(
    () => window.innerWidth,
    (w) => {
        if (w >= 640) sidebarOpen.value = true
    },
    { immediate: true }
)

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}

const setFilter = (newFilter: string) => {
    filter.value = newFilter
}
</script>

<template>
    <SidebarProvider>
        <div class="relative flex min-h-screen bg-background">
            <!-- Sidebar -->
            <!-- <TaskSidebar :activeFilter="filter" @filter-change="setFilter" :class="[
                'fixed top-0 left-0 h-full z-50 bg-background transition-transform w-64 sm:relative sm:translate-x-0',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            ]" /> -->

            <!-- Overlay for mobile -->
            <div v-if="sidebarOpen" class="fixed inset-0 z-40 bg-black/50 sm:hidden" @click="sidebarOpen = false"></div>

            <!-- Main content -->
            <div class="flex flex-col flex-1 min-h-screen">
                <!-- Navbar -->
                <nav class="flex items-center justify-between px-6 py-2 shadow-md bg-gradient-header">
                    <div class="flex items-center flex-1">
                        <Link :href="route('dashboard')" class="flex items-center gap-2">
                        <div class="logo-custom">
                            <img :src="logo" alt="Logo" class="logo-custom">
                        </div>
                        </Link>
                    </div>

                    <div class="flex-1 text-center">
                        <span class="text-xl font-bold text-white">Simple Task Manager</span>
                    </div>

                    <div class="flex items-center justify-end flex-1">
                        <div class="items-center hidden sm:flex">
                            <Dropdown align="right" width="48">
                                <template #trigger>
                                    <button
                                        class="inline-flex items-center px-3 py-2 font-medium text-white rounded hover:bg-white/20 focus:outline-none">
                                        {{ $page.props.auth.user.name }}
                                    </button>
                                </template>
                                <template #content>
                                    <DropdownLink :href="route('profile.edit')">Profile</DropdownLink>
                                    <DropdownLink :href="route('logout')" method="post" as="button">Log Out
                                    </DropdownLink>
                                </template>
                            </Dropdown>
                        </div>

                        <!-- Burger button in navbar -->
                        <div class="sm:hidden" v-if="!sidebarOpen">
                            <button @click="sidebarOpen = true"
                                class="p-2 text-white rounded hover:bg-white/20 focus:outline-none">
                                <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        <!-- Close button floating above overlay -->
                        <div v-if="sidebarOpen" class="fixed top-4 right-4 z-[9999] sm:hidden">
                            <button @click="sidebarOpen = false"
                                class="p-2 text-white rounded main-background hover:bg-white/20 focus:outline-none">
                                <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <!-- Close icon -->
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>

                <!-- Page Header -->
                <header v-if="$slots.header" class="px-6 py-4">
                    <slot name="header" />
                </header>

                <!-- Body: Sidebar + Main -->
                <div class="flex flex-1">
                    <!-- Sidebar -->
                    <TaskSidebar :activeFilter="filter" @filter-change="setFilter" :class="[
                        'fixed top-0 left-0 h-full w-64 transition-transform shadow-lg z-50',
                        sidebarOpen ? 'translate-x-0 main-background' : '-translate-x-full',
                        'sm:relative sm:translate-x-0 sm:w-64 sm:block'
                    ]" />

                    <!-- Overlay -->
                    <div v-if="sidebarOpen" class="fixed inset-0 z-40 bg-black/50 sm:hidden"
                        @click="sidebarOpen = false"></div>

                    <!-- Main Content -->
                    <main class="flex-1 px-6 py-4">
                        <slot />
                    </main>
                </div>
            </div>
        </div>
    </SidebarProvider>
</template>
