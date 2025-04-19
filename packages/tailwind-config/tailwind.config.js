/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme"
import colors from "tailwindcss/colors"
import {
  flattenColorPalette,
} from "tailwindcss/lib/util/flattenColorPalette"

module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './components/**/*.{js,ts,jsx,tsx,mdx}',
    // // packages content
    '../../packages/**/*.{js,ts,jx,tsx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      keyframes: {
        scroll: {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
    },
  },
  plugins: [],
}