'use strict'

const resolve = require('path').resolve

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Avaliação MOSE',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Adonuxt project'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico'
      }
    ]
  },

  modules: [
    'nuxt-buefy',
    '@nuxtjs/axios'
  ],

  /*
  ** Global CSS
  */
  css: ['~assets/main.scss',
    { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#744d82' },
  /*
  ** Render
  */
  render: {
    ssr: false
  },
  /*
  ** Point to resources
  */
  srcDir: resolve(__dirname, '..', 'resources')
}
