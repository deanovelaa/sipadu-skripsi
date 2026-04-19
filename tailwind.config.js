/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Memastikan file di src/ ter-scan
  ],
  theme: {
    extend: {
      fontFamily: {
        // Daftarkan "mona-sans" di sini
        sans: ['"Mona Sans"', 'sans-serif'],
        'mona-sans': ['"Mona Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}