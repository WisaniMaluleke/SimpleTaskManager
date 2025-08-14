import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    server: {
        host: '0.0.0.0',      // expose to Docker network
        port: 5173,           // fixed port for HMR
        strictPort: true,
        watch: {
            usePolling: true, // required for Docker
        },
        hmr: {
            host: 'localhost', // or your host machine IP
            protocol: 'ws',    // use WebSocket
            port: 5173,
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue(), // <-- add this
    ],
});
