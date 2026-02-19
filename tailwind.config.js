/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Backgrounds
          cream: '#FAF7F2',
          white: '#FFFFFF',
          divider: '#E5E1DA',

          // Primary brown palette
          brown: '#7C3F20',        // primary text, icons, borders
          brownLight: '#97472D',   // gradient start (FAB, promo)
          brownDark: '#44291B',    // gradient end (promo card)
          brownDeep: '#5D2C14',    // deep gradient end (FAB)
          brownMid: '#4E2D1C',     // box-shadow tint

          // Accent / interactive
          accent: '#C76A3A',       // "Highly recommended" badge, active tab underline
          accentDark: '#97472D',   // FAB gradient start

          // Veg / non-veg dots
          veg: '#14AE5C',
          nonVeg: '#E6423C',

          // Muted
          muted: '#8B8B8B',        // description text
          border: 'rgba(125,121,121,0.7)',
        },
      },
      backgroundImage: {
        'grad-promo': 'linear-gradient(180deg, #7C3F20 0%, #44291B 100%)',
        'grad-fab': 'linear-gradient(180deg, #97472D 0%, #5D2C14 100%)',
        'grad-category-active': 'linear-gradient(180deg, #97472D 0%, #5D2C14 100%)',
        'grad-category-idle': 'linear-gradient(0deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.15) 100%), #FFFFFF',
        'grad-active-pill': 'linear-gradient(90deg, #C76A3A 0%, #7C3F20 100%)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        playfair: ['"Playfair Display"', 'Playfair', 'serif'],
      },
    },
  },
  plugins: [],
};
