// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Symphonies of the Planets',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: process.env.npm_package_description || ''
        },
        {
          name: 'keywords',
          content:
            'generative music, generative music space, generative music uninverse, universe music, space music, data sonification, symphonies of planets, planet music'
        },
        {
          property: 'og:url',
          content: 'https://symphonies-of-the-planets.parkjoohyun.com/'
        },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'Symphonies of the Planets'
        },
        {
          property: 'og:description',
          content: process.env.npm_package_description || ''
        },
        {
          property: 'og:image',
          content:
            'https://symphonies-of-the-planets.parkjoohyun.com/symphonies-of-the-planets.png'
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    pageTransition: {
      name: 'fade',
      mode: 'out-in'
    }
  },
  css: ['~/assets/style/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/_font.scss";'
        }
      }
    },
    assetsInclude: ['**/*.ogg', '**/*.mp3', '**/*.wav', '**/*.mpeg']
  },
  nitro: {
    preset: 'node-server'
  }
})
