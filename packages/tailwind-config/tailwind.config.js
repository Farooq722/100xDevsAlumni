/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme"
import colors from "tailwindcss/colors"
import {
  flattenColorPalette,
} from "tailwindcss/lib/util/flattenColorPalette"

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // frontend local source files
    '../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}', // shared UI components
    '../../packages/zustand/**/*.{js,ts,jsx,tsx,mdx}', // zustand store package
    '../../packages/tailwind-config/**/*.{js,ts,jsx,tsx,mdx}', // Tailwind config if used as a package
    '../../packages/typescript-config/**/*.{js,ts,jsx,tsx,mdx}', // TS config if containing components or styles
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