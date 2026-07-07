import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
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
      spacing: {
        // 8px base spacing system is default in tailwind (1 = 4px, 2 = 8px)
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
};

export default config;
