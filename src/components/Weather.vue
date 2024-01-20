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
import axios from 'axios'

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
            const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${lat},${lon}&fields=temperature,humidity,windSpeed&timesteps=1h&units=metric&apikey=C6j53S9W6QSw4SBveVB8w2sejS3avoCH`)
            this.weather = response.data.data.timelines[0].intervals[0].values
            const forecastResponse = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${lat},${lon}&fields=temperature,humidity,windSpeed&timesteps=1d&units=metric&apikey=C6j53S9W6QSw4SBveVB8w2sejS3avoCH`)
            this.forecast = forecastResponse.data.data.timelines[0].intervals.map(interval => interval.values)
            const cityResponse = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            this.city = cityResponse.data.address.city
          } catch (error) {
            if (error.response && error.response.status === 429) {
              this.$vuetify.goTo(0)
              this.$toast.error('Has superado el límite de solicitudes a la API del clima. Por favor, intenta de nuevo más tarde.')
            } else {
              this.$toast.error('Ocurrió un error al obtener el clima. Por favor, intenta de nuevo más tarde.')
            }
          } finally {
            this.loading = false
          }
        })
      } else {
        this.$toast.error('La geolocalización no es compatible con este navegador.')
        this.loading = false
      }
    },
    getTemperatureText(temperature) {
      if (temperature < 0) {
        return 'Hace mucho frío'
      } else if (temperature < 10) {
        return 'Hace frío'
      } else if (temperature < 20) {
        return 'Hace fresco'
      } else if (temperature < 30) {
        return 'Hace calor'
      } else {
        return 'Hace mucho calor'
      }
    }
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