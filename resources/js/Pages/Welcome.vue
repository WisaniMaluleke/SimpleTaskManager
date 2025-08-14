<!-- resources/js/Pages/Landing.vue -->
<template>
  <div class="h-screen w-screen flex flex-col justify-between bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white">

    <!-- Hero Section -->
    <section class="flex flex-col items-center justify-center h-full text-center px-6">
         <!-- Circle Logo -->
      <div class="w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
        <img :src="logo" alt="Logo" class="w-40 h-40 rounded-full mb-6">
      </div>

      <h1 class="text-5xl font-bold mb-4">SimpleTaskManager</h1>
      <p class="text-xl max-w-xl mb-6">A clean, simple task management system built with modern development tools.</p>

      <!-- Dev Stack -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <span class="bg-white/20 px-4 py-2 rounded">Laravel 12</span>
        <span class="bg-white/20 px-4 py-2 rounded">PHP 8.3</span>
        <span class="bg-white/20 px-4 py-2 rounded">MongoDB</span>
        <span class="bg-white/20 px-4 py-2 rounded">Docker</span>
        <span class="bg-white/20 px-4 py-2 rounded">Vite + NPM</span>
        <span class="bg-white/20 px-4 py-2 rounded">Tailwind CSS</span>
        <span class="bg-white/20 px-4 py-2 rounded">Vue 3</span>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-4 mb-4">
        <a href="https://wislim.co.za" target="_blank" class="bg-white text-purple-700 px-6 py-2 rounded font-semibold hover:bg-white/80 transition">My Website</a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" class="bg-white text-purple-700 px-6 py-2 rounded font-semibold hover:bg-white/80 transition">LinkedIn</a>
      </div>

            <!-- Auth Buttons -->
      <div class="flex space-x-4">
        <Link href="/register" class="bg-purple-700 text-white px-6 py-2 rounded font-semibold hover:bg-purple-800 transition">Register</Link>
        <Link href="/login" class="bg-pink-700 text-white px-6 py-2 rounded font-semibold hover:bg-pink-800 transition">Login</Link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white/20 py-4 text-center text-purple-900 font-medium">
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
