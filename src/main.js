/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import 'weather-icons/css/weather-icons.css';

// Composables
import { createApp } from 'vue'

// Router
import router from '../router' // Importa la instancia de router en lugar de routes

const app = createApp(App)

registerPlugins(app)

app.use(router)

app.mount('#app')