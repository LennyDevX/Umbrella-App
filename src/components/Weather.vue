<template>
  <v-container class="weather-app bg-transaprent">
    <v-row>
      <v-col cols="12">
        <v-btn color="black" class="mr-2" @click="getWeather">
          <v-icon left class="mr-2">mdi-weather-cloudy</v-icon>
          Ver Clima
        </v-btn>
        <v-btn color="black" :href="`https://www.google.com/search?q=weather+${city}`" target="_blank">
          <v-icon left class="mr-2">mdi-google</v-icon>
          Ver en Google
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-progress-circular v-if="loading" indeterminate color="green"></v-progress-circular>
        <v-card v-else-if="weather" class="info pa-3 bg-black">
          <h2>Ubicación: {{ city }}</h2>
          <v-row>
            <v-col cols="4">
              <v-icon>mdi-thermometer</v-icon>
              <p>Temperatura: {{ weather.temperature }}°C</p>
            </v-col>
            <v-col cols="4">
              <v-icon>mdi-water-percent</v-icon>
              <p>Humedad: {{ weather.humidity }}%</p>
            </v-col>
            <v-col cols="4">
              <v-icon>mdi-weather-windy</v-icon>
              <p>Velocidad del viento: {{ weather.windSpeed }} m/s</p>
            </v-col>
          </v-row>
          <p v-if="showMore && weather.weather && weather.weather[0]">
            Descripción: {{ weather.weather[0].description }}
            <span>{{ getTemperatureText(weather.temperature) }}</span>
          </p>
          <v-card v-if="forecast" class="mt-3 bg-black">
            <v-card-title>Previsión para los próximos días</v-card-title>
            <v-card-text>
              <div v-for="(day, index) in forecast" :key="index">
                <h3>{{ day.date }}</h3>
                <v-row>
                  <v-col cols="4">
                    <v-icon>mdi-thermometer</v-icon>
                    <p>Temperatura: {{ day.temperature }}°C</p>
                  </v-col>
                  <v-col cols="4">
                    <v-icon>mdi-water-percent</v-icon>
                    <p>Humedad: {{ day.humidity }}%</p>
                  </v-col>
                  <v-col cols="4">
                    <v-icon>mdi-weather-windy</v-icon>
                    <p>Velocidad del viento: {{ day.windSpeed }} m/s</p>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import ServiceWeather, { getTemperatureText } from './ServiceWeather.js'

export default {
  name: 'WeatherApp',
  data() {
    return {
      weather: null,
      forecast: null,
      city: '',
      loading: false,
      showMore: false
    }
  },
  methods: {
    async getWeather() {
      this.loading = true
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          try {
            const { weather, forecast, city, temperatureText } = await ServiceWeather.getWeatherData(lat, lon)
            this.weather = weather
            this.forecast = forecast
            this.city = city
            this.temperatureText = temperatureText
          } catch (error) {
            // Aquí va tu código de manejo de errores
          } finally {
            this.loading = false
          }
        })
      } else {
        // Aquí va tu código de manejo de errores
        this.loading = false
      }
    },
    getTemperatureText
  }
}
</script>

<style >
.weather-app {
  max-height: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>