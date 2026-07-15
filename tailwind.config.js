/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
      },
      colors: {
        // Light mode: GitHub-inspired neutrals
        canvas: {
          default: '#ffffff',
          subtle: '#f6f8fa',
          inset: '#eef1f4',
        },
        border: {
          default: '#d0d7de',
          muted: '#d8dee4',
        },
        fg: {
          default: '#1f2328',
          muted: '#656d76',
          subtle: '#6e7781',
        },
        accent: {
          fg: '#0969da',
          emphasis: '#0969da',
          subtle: '#ddf4ff',
          muted: '#54aeff',
        },
        success: { fg: '#1a7f37', emphasis: '#1f883d', subtle: '#dafbe1' },
        attention: { fg: '#9a6700', emphasis: '#bf8700', subtle: '#fff8c5' },
        danger: { fg: '#d1242f', emphasis: '#cf222e', subtle: '#ffebe9' },
        done: { fg: '#8250df', emphasis: '#8250df', subtle: '#fbefff' },
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-in-scale': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'shimmer': { '100%': { transform: 'translateX(100%)' } },
        'scan-line': {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.15s ease-out',
        'fade-in-scale': 'fade-in-scale 0.15s ease-out',
        'slide-in-right': 'slide-in-right 0.2s ease-out',
        'slide-up': 'slide-up 0.15s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
        'scan-line': 'scan-line 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
