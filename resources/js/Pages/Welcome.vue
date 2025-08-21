<!-- resources/js/Pages/Landing.vue -->
<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <!-- Circle Logo -->
      <div class="logo-container">
        <img :src="logo" alt="Logo" class="logo-image">
      </div>

      <h1 class="hero-title">SimpleTaskManager</h1>
      <p class="hero-description">A clean, simple task management system built with modern development tools.</p>

      <!-- Dev Stack -->
      <div class="tech-stack">
        <span class="tech-badge">Laravel 12</span>
        <span class="tech-badge">PHP 8.3</span>
        <span class="tech-badge">MongoDB</span>
        <span class="tech-badge">Docker</span>
        <span class="tech-badge">Vite + NPM</span>
        <span class="tech-badge">Tailwind CSS</span>
        <span class="tech-badge">Vue 3</span>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <a href="https://wislim.co.za" target="_blank" class="btn btn-secondary">My Website</a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" class="btn btn-secondary">LinkedIn</a>
      </div>

      <!-- Auth Buttons -->
      <div class="auth-buttons">
        <Link href="/register" class="btn btn-primary">Register</Link>
        <Link href="/login" class="btn btn-accent">Login</Link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      Developed by Wisani Maluleke
    </footer>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
import logo from '../../images/logo.png'
</script>

<style scoped>
/* Landing Page Styles */

</style>
