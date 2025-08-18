<!-- resources/js/Pages/Landing.vue -->
<template>
<button class="settings-btn">⚙</button>

    <div class="header">
        <a href="#" class="logo">
            🧠 Wizie TaskManager
        </a>
    </div>

    <div class="container">
        <!-- Timer Section -->
        <div class="timer-card">
            <div class="timer-tabs">
                <button class="timer-tab active">Pomodoro</button>
                <button class="timer-tab">Short Break</button>
                <button class="timer-tab">Long Break</button>
            </div>

            <div class="timer-display">25:00</div>

            <div class="timer-controls">
                <button class="start-btn">START</button>
                <div class="control-btns">
                    <button class="control-btn">⏭</button>
                </div>
            </div>

            <div class="session-info">
                <span class="session-count">#1</span>
                Time to focus and be wise!
            </div>
        </div>

        <!-- Tasks Section -->
        <div class="tasks-section">
            <div class="tasks-header">
                <h3 class="tasks-title">Tasks</h3>

                <div class="add-task-section">
                    <div class="add-task-form">
                        <input
                            class="task-input"
                            type="text"
                            placeholder="What are you working on?"
                        >
                        <button class="add-btn">Add</button>
                    </div>
                </div>
            </div>

            <div class="task-list-container">
                <!-- No tasks state -->
                <div class="no-tasks">
                    <div class="no-tasks-icon">🧠</div>
                    <div class="no-tasks-text">Time to add a wise task!</div>
                </div>

                <!-- Example task list (hidden by default) -->
                <ul class="task-list" style="display: none;">
                    <li class="task-item">
                        <div class="task-checkbox"></div>
                        <div class="task-content">
                            <div class="task-text">Review project documentation</div>
                            <div class="task-meta">Act: 0 / Est: 1</div>
                        </div>
                        <div class="task-pomodoros">0/1</div>
                        <div class="task-menu">
                            <button class="task-menu-btn">⋯</button>
                        </div>
                    </li>

                    <li class="task-item">
                        <div class="task-checkbox completed"></div>
                        <div class="task-content">
                            <div class="task-text completed">Design homepage layout</div>
                            <div class="task-meta">Act: 2 / Est: 2</div>
                        </div>
                        <div class="task-pomodoros">2/2</div>
                        <div class="task-menu">
                            <button class="task-menu-btn">⋯</button>
                        </div>
                    </li>

                    <li class="task-item">
                        <div class="task-checkbox"></div>
                        <div class="task-content">
                            <div class="task-text">Code authentication system</div>
                            <div class="task-meta">Act: 1 / Est: 3</div>
                        </div>
                        <div class="task-pomodoros">1/3</div>
                        <div class="task-menu">
                            <button class="task-menu-btn">⋯</button>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="footer-stats">
                <div class="stat-item">
                    <span class="stat-value">0</span>
                    <span class="stat-label">Pomodoros</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">0</span>
                    <span class="stat-label">Est</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">0</span>
                    <span class="stat-label">Act</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">0</span>
                    <span class="stat-label">Finish</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
import logo from '../../images/logo.png'
</script>

<style scoped>
/* Prevent scrolling */
html, body, #app {
  overflow: hidden;
}
</style>
