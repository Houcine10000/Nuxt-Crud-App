// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },

  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
  },

  // register nitro plugin
  nitro: {
    plugins: ["~/server/db/index.ts"],
  },
});
