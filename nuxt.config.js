export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'college-result',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  target: 'static',
  ssr: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    
    { src: '~plugins/paginate.js', ssr: false },
    { src: '~/plugins/vuelidate', ssr: true },
    { src: '~/plugins/vue-good-table', ssr: false },
    { src: '~/plugins/truncate' },
    { src: '~/plugins/vue-toast' }
    
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/style-resources',

    // Simple usage
    '@nuxtjs/moment',

    // With options
    ['@nuxtjs/moment', { /* module options */ }]
  ],

  styleResources: {
    scss: [
      '~assets/scss/variables.scss'
    ]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
  ],

//   toast: {
//     position: 'bottom-left',
//     // register: [ // Register custom toasts
//     //   {
//     //     name: 'my-error',
//     //     message: 'Oops...Something went wrong',
//     //     options: {
//     //       type: 'error'
//     //     }
//     //   }
//     // ]
// },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:4000',
  },
  

  auth: {
    strategies: {
      local: {
        //      scheme: "refresh",
        token: {
          property: "token", //property name that the Back-end sends for you as a access token for saving on localStorage and cookie of user browser
          global: true,
          required: true,
          type: "Bearer"
        },
        user: {
          property: "user",
          autoFetch: true
        },
        //      refreshToken: {  // it sends request automatically when the access token expires, and its expire time has set on the Back-end and does not need to we set it here, because is useless
        //        property: "refresh_token", // property name that the Back-end sends for you as a refresh token for saving on localStorage and cookie of user browser
        //        data: "refresh_token", // data can be used to set the name of the property you want to send in the request.
        //      },
        endpoints: {
          login: { url: "/login", method: "post" },
          //        refresh: { url: "/api/auth/refresh-token", method: "post" },
          logout: false, //  we don't have an endpoint for our logout in our API and we just remove the token from localstorage
          user: false
        },
      }
    },
    redirect: {
      logout: '/login',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  }
}
