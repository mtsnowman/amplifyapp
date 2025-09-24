/**
 * Weather Service for fetching weather data from OpenWeatherMap API
 * 
 * Setup Instructions:
 * 1. Sign up for a free API key at https://openweathermap.org/api
 * 2. Set your API key in the REACT_APP_WEATHER_API_KEY environment variable
 *    - Create a .env file in the project root
 *    - Add: REACT_APP_WEATHER_API_KEY=your_api_key_here
 * 3. The free tier allows 1000 calls/day which is sufficient for this app
 */

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches current weather data for a given city
 * @param {string} city - The city name to get weather for
 * @returns {Promise<Object>} Weather data object
 */
export const getCurrentWeather = async (city) => {
  if (!API_KEY) {
    throw new Error('Weather API key not configured. Please set REACT_APP_WEATHER_API_KEY in your environment variables.');
  }

  if (!city || city.trim() === '') {
    throw new Error('City name is required');
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your REACT_APP_WEATHER_API_KEY.');
      } else {
        throw new Error(`Weather service error: ${response.status}`);
      }
    }

    const data = await response.json();
    
    // Transform the data to a more usable format
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].description,
      main: data.weather[0].main,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      visibility: data.visibility / 1000, // Convert to km
      cloudiness: data.clouds.all,
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000),
      timestamp: new Date()
    };
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to weather service. Please check your internet connection.');
    }
    throw error;
  }
};

/**
 * Gets weather icon URL from OpenWeatherMap
 * @param {string} iconCode - The icon code from weather data
 * @returns {string} Full URL to weather icon
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};