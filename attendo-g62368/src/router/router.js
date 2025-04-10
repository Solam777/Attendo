import { createRouter, createWebHistory } from 'vue-router'

import Accueil from "@/views/Accueil.vue";
import Apropos from "@/views/Apropos.vue";
import Sessions from "@/views/Sessions.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/',  name: 'accueil' , component: Accueil},
    {path: '/apropos', name: 'apropos', component: Apropos },
    {path: '/sessions', name: 'sessions', component: Sessions},
  ],
})

export default router
