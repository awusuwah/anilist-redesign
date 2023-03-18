/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{ts,vue}",
    "./src/layouts/**/*.{ts,vue}",
    "./src/pages/**/*.{ts,vue}",
    "./src/plugins/**/*.{ts,vue}",
    "./src/app.vue",
    "./nuxt.config.ts",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
