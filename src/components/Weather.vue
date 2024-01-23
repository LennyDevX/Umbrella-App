<template>
  <v-container class="weather-app bg-transparent">
    <v-row>
      <v-col cols="12">
        <v-btn color="black" class="mr-2" @click="getWeather">
          <v-icon left class="mr-2">mdi-weather-cloudy</v-icon>
          Ver Clima
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-progress-circular v-if="loading" indeterminate color="green"></v-progress-circular>
        <v-card v-else-if="weather" class="custom-info pa-3 ma-3">
          <h2>Ubicación: {{ city }}</h2>
          <v-row>
            <v-col cols="4">
              <v-icon>{{ getWeatherIcon(weather.temperature) }}</v-icon>
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
          </p>
        </v-card>
        <v-card v-if="forecast" class="custom-info pa-3 ma-3 ">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ServiceWeather from '../API/ServiceWeather.js'

export default {
  name: 'WeatherApp',
  data() {
    return {
      weather: null,
      forecast: null,
      city: '',
      loading: false,
      showMore: false,
      error: null
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
            const { weather, forecast, city } = await ServiceWeather.getWeatherData(lat, lon)
            this.weather = weather
            this.forecast = forecast
            this.city = city
          } catch (error) {
            this.error = 'No se pudo obtener los datos del clima. Por favor, inténtalo de nuevo más tarde.';
          } finally {
            this.loading = false
          }
        })
      } else {
        this.error = 'No se pudo obtener tu ubicación. Por favor, habilita la geolocalización y vuelve a intentarlo.';
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

<style>
.weather-app {
  max-height: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.custom-info {
    background-color: transparent;
    box-sizing: border-box;
    box-shadow: inset 0 0 0 1px #000000;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.55);
    border-radius: 10px;
}

</style>