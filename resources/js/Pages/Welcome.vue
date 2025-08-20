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
        <Link href="/launch-task" class="btn btn-primary">Register</Link>
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
.landing-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #facc15 100%);
  color: white;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem 1.5rem;
  text-align: center;
}

.logo-container {
  width: 160px;
  height: 160px;
  margin-bottom: 2rem;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.logo-container:hover {
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.025em;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  max-width: 600px;
  margin-bottom: 2.5rem;
  font-size: 1.25rem;
  line-height: 1.6;
  opacity: 0.95;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  max-width: 600px;
  margin-bottom: 2.5rem;
  width: 100%;
}

.tech-badge {
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.tech-badge:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.875rem 2rem;
  font-weight: 700;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  letter-spacing: 0.025em;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: hsl(var(--brand-purple));
  color: white;
}

.btn-primary:hover {
  background: hsl(275, 92%, 18%);
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(74, 1, 94, 0.4);
}

.btn-accent {
  background: hsl(var(--brand-magenta));
  color: white;
}

.btn-accent:hover {
  background: hsl(318, 100%, 40%);
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(224, 4, 132, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.95);
  color: hsl(var(--brand-purple));
}

.btn-secondary:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(255, 255, 255, 0.3);
}

.footer {
  padding: 1.5rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: 600;
  font-size: 0.95rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .logo-container {
    width: 120px;
    height: 120px;
    margin-bottom: 1.5rem;
  }

  .tech-stack {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .tech-badge {
    padding: 0.625rem 1rem;
    font-size: 0.85rem;
  }

  .action-buttons,
  .auth-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 1.5rem 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .tech-stack {
    grid-template-columns: 1fr;
  }
}

/* Prevent scrolling */
html, body, #app {
  overflow: hidden;
}
</style>
