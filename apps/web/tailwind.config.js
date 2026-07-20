/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B1120',
        surface: '#111827',
        surfaceSecondary: '#0F172A',
        primary: '#3B82F6',
        success: '#10B981',
        accent: '#8B5CF6',
        warning: '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        xl: '20px', // 20px Average Radius
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}
