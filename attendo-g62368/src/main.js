import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router/router.js'
import App from "@/App.vue";
import listeSessions from "@/Components/ListeSessions.vue";
import AddSessions from "@/Components/AddSessions.vue";


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
