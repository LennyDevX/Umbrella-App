<template>
  <v-container class="weather-app bg-transparent">
    <v-row>
      <v-col cols="12">
        <v-btn class="custom-button mr-2" @click="getWeather">
          Ver Clima
          <v-icon left class="ml-2">mdi-weather-cloudy</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-progress-circular v-if="loading" indeterminate color="black"></v-progress-circular>
        <v-row v-else>
          <v-col cols="12" sm="6" class="pa-2">
            <v-card v-if="weather" class="custom-info pa-3 ma-2">
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
            <v-card v-if="cityInfo" class="custom-info pa-3 ma-2">
              <v-card-title>Detalles de ubicacion</v-card-title>
              <v-card-text>
                <p><strong>Dirección:</strong> {{ cityInfo.formattedAddress }}</p>
                <p><strong>Ciudad:</strong> {{ cityInfo.components.city }}</p>
                <p><strong>Estado:</strong> {{ cityInfo.components.state }}</p>
                <p><strong>País:</strong> {{ cityInfo.components.country }}</p>
                <p><strong>Zona horaria:</strong> {{ cityInfo.annotations.timezone.name }}</p>
                <p><strong>Moneda:</strong> {{ cityInfo.annotations.currency.name }}</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" class="pa-2">
            <v-card v-if="forecast" class="custom-info pa-3 ma-2">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ServiceWeather from '../../API/ServiceWeather'

export default {
  name: 'WeatherApp',
  data() {
    return {
      weather: null,
      forecast: null,
      city: '',
      cityInfo: null,
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
            this.cityInfo = await ServiceWeather.getCityInfo(lat, lon);
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
    box-shadow: 4px 4px 3px 2px rgba(0,0,0,0.55);
    border-radius: 10px;
    animation: appear 1s ease-out; /* Agrega esta línea */


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

.custom-button {
  background-color: transparent;
  box-sizing: border-box;
  box-shadow: 6px 7px 5px 0px rgba(0, 0, 0, 0.379);
  border-radius: 10px;
  color: black;
  transition: 1s;
  &:hover {
    background-image: linear-gradient(to right, #b9d1d4aa, #b2ebf28f, #f3e784aa, #fff9c4);
    box-shadow: 4px 4px 4px rgba(224, 162, 17, 0.726); /* Sombra inicial */
    transform: scale(0.98);
    transition: 1s;
  }

}

</style>