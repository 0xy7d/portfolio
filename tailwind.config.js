/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'float': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        'float-x': {
          '0%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(8px)' },
          '100%': { transform: 'translateX(0px)' }
        },
        'float-smooth': {
          '0%': { transform: 'translateY(0px) scale(1)' },
          '25%': { transform: 'translateY(-8px) scale(1.02)' },
          '50%': { transform: 'translateY(0px) scale(1)' },
          '75%': { transform: 'translateY(6px) scale(0.99)' },
          '100%': { transform: 'translateY(0px) scale(1)' }
        },
        'float-xy': {
          '0%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '25%': { transform: 'translate(6px, -6px) rotate(1deg)' },
          '50%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '75%': { transform: 'translate(-6px, 6px) rotate(-1deg)' },
          '100%': { transform: 'translate(0px, 0px) rotate(0deg)' }
        },
        'drift-right': {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(120vw,-40vh,0)' }
        },
        'drift-left': {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-120vw,40vh,0)' }
        },
        'pulse-soft': {
          '0%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.06)' },
          '100%': { opacity: '0.35', transform: 'scale(1)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 800ms ease-out both',
        'float': 'float 4.5s ease-in-out infinite',
        'float-x': 'float-x 6s ease-in-out infinite',
        'float-smooth': 'float-smooth 7s cubic-bezier(0.45,0,0.55,1) infinite',
        'float-xy': 'float-xy 9s cubic-bezier(0.45,0,0.55,1) infinite',
        'drift-right': 'drift-right 18s linear infinite',
        'drift-left': 'drift-left 22s linear infinite',
        'pulse-soft': 'pulse-soft 5s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
