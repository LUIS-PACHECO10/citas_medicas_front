

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify' // Asegúrate de tener este archivo
import router from './router'
import store from "./store";
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')
