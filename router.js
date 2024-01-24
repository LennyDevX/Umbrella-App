// router.js o router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import Weather from './src/components/Weather.vue'
import BuscarCiudad from './src/components/SearchCity.vue'
import Home from './src/components/Home.vue'
import Tabs from './src/components/Tabs.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },

    {
        path: '/weather',
        name: 'Weather',
        component: Weather
    },

    {
        path: '/city', 
        name: 'BuscarCiudad',
        component: BuscarCiudad
    },
            
    {
        path: '/tabs',
        name: 'Tabs',
        component: Tabs
    },
    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router