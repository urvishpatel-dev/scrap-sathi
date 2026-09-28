/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Master Design Tokens
        mint: {
          wash: '#f2ffe3',     // Primary Canvas
          light: '#f7fff0',
        },
        lime: {
          vivid: '#a3fda7',    // Primary Accent Pill
          light: '#caffcd',
        },
        spring: {
          start: '#82ff87',    // Gradient Start
          end: '#deff82',      // Citrus Gradient End
        },
        forest: {
          depth: '#0d5b3b',    // Editorial Forest Green
          pine: '#083a26',     // Pine Shadow
          800: '#174B36',
          600: '#246B4B',
        },
        charcoal: {
          ink: '#000000',      // Pure Black High-Contrast Actions
          stone: '#2d3637',    // Secondary Charcoal Text
          muted: '#526061',
        },
        mist: {
          warm: '#e9e7e2',     // Warm Mist Neutral
        },
        silver: {
          border: '#cccccc',   // Clean Delicate Border
          light: '#e5e5e5',
        },
        sage: {
          gray: '#838676',
          eucalyptus: '#9cb0a8',
          100: '#E8F1EA',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'editorial': '0 0 28px rgba(0, 0, 0, 0.09)',
        'editorial-hover': '0 8px 36px rgba(13, 91, 59, 0.12)',
        'pill': '0 2px 10px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        '24': '24px',
        'pill': '200px',
      },
      maxWidth: {
        'editorial': '1200px',
      },
    },
  },
  plugins: [],
}
