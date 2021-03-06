/* eslint-disable */
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

// export default createVuetify({
//   // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
// )

export default createVuetify({
  theme: {
    defaultTheme: 'custom',
    themes: {
      custom: {
        dark: true,
        colors: {
          background: '#202020',
        },
        variables: {

        },
      },
    },
  },
})
