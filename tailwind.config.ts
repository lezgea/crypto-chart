import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./src/styles/**/*.{css,scss}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      customBlue: {
        50: '#ebf5ff',
        100: '#e1effe',
        200: '#c3ddfd',
        300: '#a4cafe',
        400: '#76a9fa',
        500: '#3f83f8',
        600: '#1c64f2',
        700: '#1a56db',
        800: '#1e429f',
        900: '#282732',
      },
      dark: '#000',
      custom_gray: '#EFEFF2',
      fontWeight: {
        thin: '200',
        light: '300',
        regular: '400',
        regmed: '500',
        medium: '600',
        semi: '700',
        bold: '800',
        black: '900',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
