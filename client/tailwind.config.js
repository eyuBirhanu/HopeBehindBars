/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      brand: {
        'rose': '#b87a7f',         // For primary CTA like 'Donate'
        'dark-blue': '#0e4257',    // For backgrounds like Navbar/Footer
        'dark-gray': '#111827',    // For primary text
        'sky-blue': '#2daae2',     // For links, highlights, and active states
        // We can keep the old ones too if needed, or replace them
        light: '#e0f2fe',
        DEFAULT: '#38bdf8',
        medium: '#0ea5e9',
        dark: '#0284c7',
      },
      neutral: { /* ... */ }
    },
    // ... rest of your theme
  },
},
  // theme: {
  //   extend: {
  //     backgroundColor:{
  //       'sky-blue': '#2daae2',
  //     },
  //     color: {
  //       'sky-blue': '#2daae2',
        
  //     }
  //   },
  // },
  plugins: [],
}

