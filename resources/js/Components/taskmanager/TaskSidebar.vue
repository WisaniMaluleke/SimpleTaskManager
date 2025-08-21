<script setup lang="ts">
import { ref, computed } from "vue"
import logo from '../../../images/logo.png'
import { CheckSquare, Clock, PlayCircle, Settings, Plus } from "lucide-vue-next"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/Components/taskmanager/ui/sidebar"

interface TaskSidebarProps {
    onFilterChange: (filter: string) => void
    activeFilter: string
}

const props = defineProps<TaskSidebarProps>()
const { state } = useSidebar()
const isCollapsed = computed(() => state.value === "collapsed")

const filters = [
    { id: "all", title: "All Tasks", icon: CheckSquare },
    { id: "pending", title: "Pending", icon: Clock },
    { id: "in-progress", title: "In Progress", icon: PlayCircle },
    { id: "completed", title: "Completed", icon: CheckSquare },
]

const handleFilterClick = (filterId: string) => {
    props.onFilterChange(filterId)
}
</script>

<template>
    <Sidebar :class="isCollapsed ? 'w-10' : 'w-40'" collapsible="icon">
        <SidebarContent class="bg-gradient-header">
            <!-- Filters Group -->
            <SidebarGroup>
                <SidebarGroupLabel class="font-medium text-white/80">
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="filter in filters" :key="filter.id">
                            <SidebarMenuButton @click="handleFilterClick(filter.id)" :class="props.activeFilter === filter.id
                                ? 'bg-white/20 text-white font-medium'
                                : 'text-white/80 hover:bg-white/10 hover:text-white'">
                                <component :is="filter.icon" class="w-4 h-4" />
                                <span v-if="!isCollapsed">{{ filter.title }}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            <!-- Actions Group -->
            <SidebarGroup>
                <SidebarGroupLabel class="ml-4 font-medium text-white/80">
                    <span v-if="!isCollapsed">Actions</span>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton class="text-white/80 hover:bg-white/10 hover:text-white">
                                <Plus class="w-4 h-4" />
                                <span v-if="!isCollapsed">Add Task</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton class="text-white/80 hover:bg-white/10 hover:text-white">
                                <Settings class="w-4 h-4" />
                                <span v-if="!isCollapsed">Settings</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
</template>
