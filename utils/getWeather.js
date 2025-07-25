// utils/getWeather.js
const axios = require('axios');

async function getWeather() {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const city = "Melbourne";
  const units = "metric";

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
    );

    const data = response.data;
    return {
      icon: mapWeatherToEmoji(data.weather[0].main),
      temp: `${Math.round(data.main.temp)}°C`,
      city: data.name,
      description: data.weather[0].main
    };
  } catch (err) {
    console.error("Weather fetch failed:", err.message);
    return {
      icon: "☀️",
      temp: "21°C",
      city: "Melbourne",
      description: "Sunny"
    };
  }
}

function mapWeatherToEmoji(condition) {
  switch (condition) {
    case "Clouds": return "☁️";
    case "Rain": return "🌧️";
    case "Clear": return "☀️";
    case "Snow": return "❄️";
    case "Thunderstorm": return "⛈️";
    case "Drizzle": return "🌦️";
    default: return "🌈";
  }
}

module.exports = { getWeather };
