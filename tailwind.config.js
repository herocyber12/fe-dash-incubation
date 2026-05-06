/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Pastikan baris ini ada!
  ],
  theme: {
    extend: {
      colors: {
        // Kamu bisa kustom warna charcoal di sini jika mau
        charcoal: '#1E293B',
      }
    },
  },
  plugins: [],
}