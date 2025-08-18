<!-- resources/js/Pages/Landing.vue -->
<template>
  <div class="flex flex-col justify-between w-screen h-screen page-bg">

    <!-- Hero Section -->
    <section class="flex flex-col items-center justify-center h-full px-6 text-center">
         <!-- Circle Logo -->
      <div class="w-40 h-40 mb-6 overflow-hidden border-4 border-white rounded-full shadow-lg">
        <img :src="logo" alt="Logo" class="w-40 h-40 mb-6 rounded-full">
      </div>

      <h1 class="mb-4 text-5xl font-bold">SimpleTaskManager</h1>
      <p class="max-w-xl mb-6 text-xl">A clean, simple task management system built with modern development tools.</p>

      <!-- Dev Stack -->
      <div class="grid grid-cols-2 gap-4 mb-8 md:grid-cols-3">
        <span class="px-4 py-2 rounded bg-white/20">Laravel 12</span>
        <span class="px-4 py-2 rounded bg-white/20">PHP 8.3</span>
        <span class="px-4 py-2 rounded bg-white/20">MongoDB</span>
        <span class="px-4 py-2 rounded bg-white/20">Docker</span>
        <span class="px-4 py-2 rounded bg-white/20">Vite + NPM</span>
        <span class="px-4 py-2 rounded bg-white/20">Tailwind CSS</span>
        <span class="px-4 py-2 rounded bg-white/20">Vue 3</span>
      </div>

      <!-- Action Buttons -->
      <div class="flex mb-4 space-x-4">
        <a href="https://wislim.co.za" target="_blank" class="px-6 py-2 font-semibold text-purple-700 transition bg-white rounded hover:bg-white/80">My Website</a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" class="px-6 py-2 font-semibold text-purple-700 transition bg-white rounded hover:bg-white/80">LinkedIn</a>
      </div>

            <!-- Auth Buttons -->
      <div class="flex space-x-4">
        <Link href="/launch-task" class="px-6 py-2 font-semibold text-white transition bg-purple-700 rounded hover:bg-purple-800">Register</Link>
        <Link href="/login" class="px-6 py-2 font-semibold text-white transition bg-pink-700 rounded hover:bg-pink-800">Login</Link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-4 font-medium text-center text-purple-900 bg-white/20">
      Developed by Wisani Maluleke
    </footer>
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
