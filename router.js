// router.js o router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import Weather from './src/components/Weather.vue'
import BuscarCiudad from './src/components/SearchCity.vue'

const routes = [
    {
        path: '/',
        name: 'Weather',
        component: Weather
    },
    {
        path: '/city',
        name: 'BuscarCiudad',
        component: BuscarCiudad
      }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router