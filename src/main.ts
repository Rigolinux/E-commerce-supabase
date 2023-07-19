import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { EnvConfig } from './config/EnvConfig';
import { supabase } from './config/supbaseClient';

import App from './App.vue'
import router from './router'


import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', 
  },
})


const app = createApp(App)
app.config.globalProperties.$env = EnvConfig
app.config.globalProperties.$supabase = supabase

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
