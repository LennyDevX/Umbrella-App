// ServiceWeather.js
import axios from 'axios'

export default {
    async getWeatherData(lat, lon) {
        try {
            const { data: weatherData } = await axios.get(`${import.meta.env.VITE_WEATHER_API_URL}?location=${lat},${lon}&fields=temperature,humidity,windSpeed&timesteps=1h&units=metric&apikey=${import.meta.env.VITE_API_KEY}`)
            const { data: forecastData } = await axios.get(`${import.meta.env.VITE_WEATHER_API_URL}?location=${lat},${lon}&fields=temperature,humidity,windSpeed&timesteps=1d&units=metric&apikey=${import.meta.env.VITE_API_KEY}`)
            const { data: cityData } = await axios.get(`${import.meta.env.VITE_CITY_API_URL}&lat=${lat}&lon=${lon}`)

            if (!weatherData.data || !forecastData.data || !cityData) {
                throw new Error('Los datos devueltos por la API no son los esperados')
            }

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
            const url = `${import.meta.env.VITE_GEOCODING_API_URL}&q=${encodeURIComponent(city)}&limit=1`
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
          const response = await axios.get(`${import.meta.env.VITE_OPENCAGE_API_URL}?q=${lat}+${lon}&key=${import.meta.env.VITE_OPENCAGE_API_KEY}`);
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