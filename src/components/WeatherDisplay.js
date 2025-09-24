import React from 'react';
import { getWeatherIconUrl } from '../services/weatherService';
import './WeatherDisplay.css';

/**
 * WeatherDisplay component - Shows detailed weather information
 * @param {Object} props - Component props
 * @param {Object} props.weatherData - Weather data object
 */
const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="weather-display">
      <div className="weather-header">
        <div className="location">
          <h2>{weatherData.city}, {weatherData.country}</h2>
          <p className="timestamp">
            Last updated: {weatherData.timestamp.toLocaleString()}
          </p>
        </div>
        <div className="weather-icon">
          <img 
            src={getWeatherIconUrl(weatherData.icon)} 
            alt={weatherData.description}
            title={weatherData.description}
          />
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <div className="temperature">
            <span className="temp-value">{weatherData.temperature}</span>
            <span className="temp-unit">°C</span>
          </div>
          <div className="feels-like">
            Feels like {weatherData.feelsLike}°C
          </div>
          <div className="description">
            {weatherData.description.charAt(0).toUpperCase() + weatherData.description.slice(1)}
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weatherData.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{weatherData.pressure} hPa</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind</span>
            <span className="detail-value">
              {weatherData.windSpeed} m/s {getWindDirection(weatherData.windDirection)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{weatherData.visibility} km</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Clouds</span>
            <span className="detail-value">{weatherData.cloudiness}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Sunrise</span>
            <span className="detail-value">{formatTime(weatherData.sunrise)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Sunset</span>
            <span className="detail-value">{formatTime(weatherData.sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;