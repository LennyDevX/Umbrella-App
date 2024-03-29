// ServiceWeather.js
import axios from 'axios'
import { API_KEY, WEATHER_API_URL, CITY_API_URL, GEOCODING_API_URL, OPENCAGE_API_KEY, OPENCAGE_API_URL } from './Weather';

export default {
    async getWeatherData(lat, lon) {
        try {
            const { data: weatherData } = await axios.get(`${WEATHER_API_URL}?location=${lat},${lon}&fields=temperature,humidity,windSpeed&timesteps=1h&units=metric&apikey=${API_KEY}`)
            const { data: forecastData } = await axios.get(`${WEATHER_API_URL}?location=${lat},${lon}&fields=temperature,humidity,windSpeed&timesteps=1d&units=metric&apikey=${API_KEY}`)
            const { data: cityData } = await axios.get(`${CITY_API_URL}&lat=${lat}&lon=${lon}`)

            const weather = weatherData.data.timelines[0].intervals[0].values
            const forecast = forecastData.data.timelines[0].intervals.map(interval => interval.values)
            const city = cityData.address.city

            return { weather, forecast, city }
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    async getCoordinates(city) {
        try {
            const url = `${GEOCODING_API_URL}&q=${encodeURIComponent(city)}&limit=1`
            console.log(`Making request to: ${url}`)
            const { data } = await axios.get(url)
            const lat = data[0].lat
            const lon = data[0].lon
            return { lat, lon }
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    async getCityInfo(lat, lon) {
        try {
          const response = await axios.get(`${OPENCAGE_API_URL}?q=${lat}+${lon}&key=${OPENCAGE_API_KEY}`);
          const data = response.data.results[0];
          const formattedAddress = data.formatted;
          const components = data.components;
          const annotations = data.annotations;
          const geometry = data.geometry;
          const bounds = data.bounds;
          return { formattedAddress, components, annotations, geometry, bounds };
        } catch (error) {
          console.error('No se pudo obtener la información de la ciudad:', error);
          throw error;
        }
      }
}