// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/image", "@nuxt/icon"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  image: {
    dir: 'assets/images',
},  
  runtimeConfig: {
    public: {
      apiUrl: "",
      authToken: "",
      days: [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ],
      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
    },
  },
  routeRules: {
    "/": { redirect: "/auth/login" },
  },
});