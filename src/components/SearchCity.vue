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
                                <v-btn class="custom-button" @click="buscarCiudad">Buscar Ciudad</v-btn>
                                <v-progress-circular v-if="loading" class="ml-3" color="black" indeterminate></v-progress-circular>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card v-if="weather" class="custom-card-info ma-2 pa-4">
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
import ServiceWeather from '../API/ServiceWeather.js'

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
    background-color: transparent;
    box-sizing: border-box;
    box-shadow: inset 0 0 0 1px #000000;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
    border-radius: 10px;

}

.custom-card {
    background-color: transparent;
    color: black;
    border-radius: 10px;
    box-shadow: inset 0 0 0 1px #000000;
    transition: 1s;
    &:hover {
        background-color: rgba(97, 96, 96, 0.269);
        box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.363); /* Sombra inicial */
        transform: scale(0.95);
        transition: 1s;
    }
}
.custom-button {
    color: white;
    border: 2px solid rgba(0, 0, 0, 0.6); /* Borde negro semi-transparente */
    border-radius: 9px;
    background-color: black; /* Fondo transparente */
    transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Transición suave al cambiar el color de fondo y la sombra */
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3); /* Sombra inicial */
}

.custom-button:hover {
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7); /* Sombra más oscura al pasar el ratón */
}
</style>