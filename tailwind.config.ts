import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#08514F',
          mid: '#0A6865',
          light: '#E8F5F4',
          xlight: '#F0FAF9',
        },
        accent: {
          DEFAULT: '#F5A623',
          light: '#FFF3DC',
          dark: '#C47F0A',
        },
        dark: {
          DEFAULT: '#0F1C1C',
          mid: '#1E3535',
        },
        neutral: {
          mid: '#4A6565',
          light: '#7A9E9E',
          border: '#D0E6E5',
          cream: '#FFFDF8',
        },
        error: '#E84545',
        success: '#1A9E75',
      },
      fontFamily: {
        heading: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-nunito)', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
