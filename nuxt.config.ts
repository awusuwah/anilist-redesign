import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Change the source directory for the code to have better separation
  srcDir: "src/",

  ssr: false,

  alias: {
    "~": path.resolve(__dirname, "src"),
    "@": path.resolve(__dirname, "src/components"),
  },

  modules: ["@pinia/nuxt", "nuxt-graphql-client"],

  // Load the css file for tailwindcss
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      GQL_HOST: "https://graphql.anilist.co",
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
