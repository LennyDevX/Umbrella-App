<template>
    <v-container fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="12">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-card class="ma-5 pa-5 custom-card">
                            <v-text-field
                                class="black white--text mb-3 pa-5"
                                label="Buscar..."
                                single-line
                                hide-details
                                v-model="search"
                                placeholder="Buscar ciudad"
                            ></v-text-field>
                            <div class="d-flex justify-center mb-5">
                                <v-btn class="custom-search-button" @click="buscarCiudad">Buscar Ciudad</v-btn>
                                <v-progress-circular v-if="loading" class="ml-3" color="black" indeterminate></v-progress-circular>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card v-if="weather" class="custom-card-info">
                            <h2 class="pa-3">Ubicación: {{ city }}</h2>
                            <v-row class="pa-3">
                                <v-col cols="4">
                                    <v-icon>{{ getWeatherIcon(weather.temperature) }}</v-icon>
                                    <p>Temperatura {{ weather.temperature }}°C</p>
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
            </v-col>
        </v-row>
    </v-container>
</template>

<!-- Resto del código -->

<script>
import ServiceWeather from '../../API/ServiceWeather'

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



.custom-card-info {
    margin:25px 25px;
    background-image: linear-gradient(to right, #d1a5fb30, #9078fb3b, #abfae151);
    box-shadow: 3px 3px 3px 3px rgba(0,0,0,0.55);
    border-radius: 7px;
    animation: appear 1.1s ease-out; /* Agrega esta línea */
}

@keyframes appear { /* Agrega este bloque */
    0% {
        opacity: 0;
        transform: scale(0.9);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.custom-card {
    background-color: transparent;
    color: black;
    border-radius: 10px;
    transition: 1s;
    &:hover {
        background-color: rgba(211, 209, 209, 0.233);
        transform: scale(0.99);
        transition: 1s;
    }
}
.custom-search-button {
    background-color: transparent;
    border-radius: 10px;
    color: black;
    transition: 0.8s;
    &:hover {
        background-image: linear-gradient(to right, #ca98f830, #8368fa49, #94f3d540);
        color: black;
        transform: scale(0.97);
        transition: 0.8s;
    }
}


</style>