/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        slate: {
          200: '#e2e8f0',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Tier-specific colors
        tier: {
          s: '#ef4444', // red-500
          a: '#8b5cf6', // violet-500
          b: '#3b82f6', // blue-500
          c: '#10b981', // emerald-500
        },
        // Accent colors
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
      fontFamily: {
        // Body text
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Headings
        display: ['Exo 2', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
