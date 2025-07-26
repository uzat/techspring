// ===== UTILS/GETWEATHER.JS =====
// utils/getWeather.js
const axios = require('axios');

async function getWeather(lat = -37.8136, lon = 144.9631, city = 'Melbourne') {
    try {
        // Using OpenWeatherMap API - you'll need to get a free API key
        const apiKey = process.env.OPENWEATHER_API_KEY || 'demo_key';
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        if (response.status !== 200) {
            throw new Error('Failed to fetch weather data');
        }
        return {
            city: city,
            temperature: Math.round(response.data.main.temp),
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed
        };
    } catch (error) {
        console.error('Error fetching weather:', error);
        // Fallback weather data for Melbourne
        return {
            city: city,
            temperature: 18,
            description: 'partly cloudy',
            humidity: 65,
            windSpeed: 12
        };
    }
}

module.exports = { getWeather };