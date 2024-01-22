<template>
    <v-container fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="ma-5 pa-5 bg-black rounded-lg">
                    <v-card-title class="white--text m-2 p-2 text-center">Buscar Ciudades</v-card-title>
                    <v-text-field
                        class="black white--text mb-3 pa-5"
                        label="Buscar..."
                        single-line
                        hide-details
                        v-model="search"
                        placeholder="Buscar ciudad"
                    ></v-text-field>
                    <div class="d-flex justify-center mb-5">
                        <v-btn class="bg-black white--text" @click="buscarCiudad">Buscar Ciudad</v-btn>
                        <v-progress-circular v-if="loading" class="ml-3" color="blue" indeterminate></v-progress-circular>
                    </div>
                </v-card>
                
                <v-card v-if="weather" class="info pa-3 bg-black rounded-lg opacity-75 mt-5">
                    <h2 class="pa-3">Ubicación: {{ city }}</h2>
                    <v-row class="pa-3">
                        <v-col cols="4">
                            <v-icon>{{ getWeatherIcon(weather.temperature) }}</v-icon>
                            <p>Temperatura: {{ weather.temperature }}°C</p>
                        </v-col>
                        <v-col cols="4">
                            <v-icon>mdi-water-percent</v-icon>
                            <p>Humedad {{ weather.humidity }}%</p>
                        </v-col>
                        <v-col cols="4">
                            <v-icon>mdi-weather-windy</v-icon>
                            <p>Velocidad del viento {{ weather.windSpeed }} m/s</p>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ServiceWeather from '../components/API/ServiceWeather.js'

export default {
    data() {
        return {
            search: '',
            weather: null,
            city: '',
            loading: false
        }
    },
    methods: {
        async buscarCiudad() {
            this.loading = true
            try {
                const { lat, lon } = await ServiceWeather.getCoordinates(this.search)
                const { weather, city } = await ServiceWeather.getWeatherData(lat, lon)
                this.weather = weather
                this.city = city
            } catch (error) {
                console.error(error)
                // Aquí va tu código de manejo de errores
            } finally {
                this.loading = false
            }
        },
        getWeatherIcon(temperature) {
      if (temperature <= 0) {
        return 'mdi-snowflake';
      } else if (temperature <= 20) {
        return 'mdi-weather-rainy';
      } else {
        return 'mdi-weather-sunny';
      }
    }
        
    }
}
</script>

<style scoped>
.v-card {
    background-color: rgba(0, 0, 0, 0.7) !important;
    border-radius: 15px;
}

.opacity-75 {
    opacity: 0.75;
}
</style>