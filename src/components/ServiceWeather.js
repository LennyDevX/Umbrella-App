// ServiceWeather.js
import axios from 'axios'
import { API_KEY, WEATHER_API_URL, CITY_API_URL } from './API/Weather';

export function getTemperatureText(temperature) {
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

export default {
    async getWeatherData(lat, lon) {
        try {
            const { data: weatherData } = await axios.get(`${WEATHER_API_URL}?location=${lat},${lon}&fields=temperature,humidity,windSpeed&timesteps=1h&units=metric&apikey=${API_KEY}`)
            const { data: forecastData } = await axios.get(`${WEATHER_API_URL}?location=${lat},${lon}&fields=temperature,humidity,windSpeed&timesteps=1d&units=metric&apikey=${API_KEY}`)
            const { data: cityData } = await axios.get(`${CITY_API_URL}&lat=${lat}&lon=${lon}`)

            const weather = weatherData.data.timelines[0].intervals[0].values
            const forecast = forecastData.data.timelines[0].intervals.map(interval => interval.values)
            const city = cityData.address.city
            const temperatureText = getTemperatureText(weather.temperature)

            return { weather, forecast, city, temperatureText }
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}