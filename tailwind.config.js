/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Skeuomorphic Industrial Palette
        industrial: {
          900: '#121212', // Deep Carbon
          800: '#181818', // Matte Plastic
          700: '#222222', // Dark Aluminum
          600: '#333333', // Tool / Wrench gray
          500: '#555555', // Base metal
          400: '#777777', // Brushed highlight
          300: '#999999', // Reflective metal
          200: '#cccccc', // Bright aluminum
          100: '#e5e5e5', // Whitish glare
        },
        software: {
          blue: '#5BADFF',     // Accessible blue — 7.5:1 contrast on #18181a (WCAG AA ✓)
          panel: '#2D2D30',    // Studio dark panel
          border: '#3E3E42',   // Studio border
        },
        mechanic: {
          red: '#D32F2F',      // Physical Red Button / Error
          redDark: '#990000',  // Pushed red button
          green: '#388E3C',    // Success / OK LED
          amber: '#F57C00',    // Warning
        }
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        // Realistic 3D Box Shadows
        'metal-plate': '0 10px 30px rgba(0,0,0,0.8), inset 0 2px 2px rgba(255,255,255,0.2), inset 0 -2px 2px rgba(0,0,0,0.5)',
        'metal-plate-flat': '0 4px 10px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -1px 1px rgba(0,0,0,0.3)',
        'button-up': '0 6px 15px rgba(0,0,0,0.5), inset 0 4px 4px rgba(255,255,255,0.3), inset 0 -4px 4px rgba(0,0,0,0.2)',
        'button-down': '0 1px 2px rgba(0,0,0,0.8), inset 0 6px 10px rgba(0,0,0,0.6), inset 0 -1px 2px rgba(255,255,255,0.1)',
        'plastic-inset': 'inset 0 4px 8px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.05)',
        'rivet': '0 2px 4px rgba(0,0,0,0.6), inset 0 2px 2px rgba(255,255,255,0.4), inset 0 -2px 2px rgba(0,0,0,0.8)',
        'screw-hole': 'inset 0 4px 6px rgba(0,0,0,0.9)',
        // Neumorphism Shadows
        'neu-out': '5px 5px 10px #0a0a0a, -5px -5px 10px #2a2a2a',
        'neu-in': 'inset 5px 5px 10px #0a0a0a, inset -5px -5px 10px #2a2a2a',
      },
      backgroundImage: {
        'brushed-metal': 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px), linear-gradient(135deg, #1f1f1f 0%, #121212 100%)',
        'brushed-aluminum': 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.02) 1px, rgba(0,0,0,0.02) 2px), linear-gradient(135deg, #cccccc 0%, #999999 100%)',
      }
    },
  },
  plugins: [],
}
