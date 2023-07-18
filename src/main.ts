import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { EnvConfig } from './config/EnvConfig';
import { supabase } from './config/supbaseClient';

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$env = EnvConfig
app.config.globalProperties.$supabase = supabase

app.use(createPinia())
app.use(router)

app.mount('#app')
