/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'texture': "url('https://blog.stockvault.net/wp-content/uploads/2020/02/free_texture_friday_2355.jpg')",
      },
      fontFamily: {
        circle: ['Yatra One', 'serif'],
      },
    },
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar'),
    require('@tailwindcss/aspect-ratio'),
  ],
  daisyui: {
    themes: ['dark'],
    base: false,
    utils: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
}
