/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'disk-move': 'diskMove 0.5s ease-in-out',
        'disk-bounce': 'diskBounce 0.3s ease-in-out',
      },
      keyframes: {
        diskMove: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        diskBounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      },
      colors: {
        'amber-100': '#fef3c7',
        'amber-200': '#fde68a',
        'amber-300': '#fcd34d',
        'amber-700': '#92400e',
        'amber-800': '#78350f',
        'blue-50': '#eff6ff',
        'blue-100': '#dbeafe',
        'blue-500': '#3b82f6',
        'blue-600': '#2563eb',
        'red-500': '#ef4444',
        'red-600': '#dc2626',
        'green-500': '#22c55e',
        'green-600': '#16a34a',
        'yellow-500': '#eab308',
        'yellow-600': '#ca8a04',
        'purple-500': '#a855f7',
        'purple-600': '#9333ea',
      }
    },
  },
  plugins: [],
}