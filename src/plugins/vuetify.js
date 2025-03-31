// src/plugins/vuetify.js
import { createVuetify } from 'vuetify'

// Importa los estilos de Vuetify
import 'vuetify/styles'  // Importa los estilos de Vuetify (requerido)
import { aliases, mdi } from 'vuetify/iconsets/mdi'  // Opcional: para usar iconos

// Crea la instancia de Vuetify
const vuetify = createVuetify({
  // Personaliza la configuración de Vuetify según tus necesidades
  theme: {
    defaultTheme: 'light',  // O 'dark' si prefieres el tema oscuro
    themes: {
      light: {
        primary: '#6200ea',  // Cambia el color principal del tema
        secondary: '#03dac6',
      },
      dark: {
        primary: '#bb86fc',  // Tema oscuro personalizado
        secondary: '#03dac6',
      },
    },
  }, 
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,  // Configura el conjunto de iconos MDI
    },
  }, 
})

export default vuetify
