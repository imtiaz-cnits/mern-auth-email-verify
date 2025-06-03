/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Admin Colors
        'admin-primary': 'var(--admin-primary)',
        'admin-secondary': 'var(--admin-secondary)',
        'admin-border': 'var(--admin-border)',
        'admin-border2': 'var(--admin-border2)',
        'admin-dark-border': 'var(--admin-dark-border)',
        'admin-light-hover': 'var(--admin-light-hover)',
        'admin-bg': 'var(--admin-bg)',
        'admin-text1': 'var(--admin-text1)',
        'admin-text2': 'var(--admin-text2)',
        'admin-text3': 'var(--admin-text3)',
        'admin-text4': 'var(--admin-text4)',
        'admin-accent': 'var(--admin-accent)',
        'admin-accent2': 'var(--admin-accent2)',
        'admin-dark-hover': 'var(--admin-dark-hover)',
        'admin-dark-bg': 'var(--admin-dark-bg)',
        'admin-dark-bg2': 'var(--admin-dark-bg2)',
        'admin-dark-bg3': 'var(--admin-dark-bg3)',
      },
      fontFamily: {
        'dm-sans': ['var(--admin-primary-font)', '"DM Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
