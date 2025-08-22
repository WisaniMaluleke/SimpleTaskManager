import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "brand-green": "#22c55e",
                "brand-yellow": "#facc15",
                "brand-orange": "#fb923c",
                'brand-success': "#20c100",
                'brand-inprogress': "#0956a3",
            },
        },
    },

    plugins: [forms],
};
