import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/scenes/**/*.{js,ts,jsx,tsx,mdx}',
    './src/spatial/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#EAE6DF',
          light: '#F3F0EA',
          warm: '#E2DDD4',
          deep: '#D5CFC3',
        },
        ink: {
          DEFAULT: '#141413',
          muted: '#4A4945',
          subtle: '#78756E',
          faint: '#A5A198',
        },
        blueprint: {
          line: 'rgba(20, 20, 19, 0.14)',
          grid: 'rgba(20, 20, 19, 0.055)',
          accent: '#3E5463',
          oxide: '#8C4A32',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        editorial: ['var(--font-editorial)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
