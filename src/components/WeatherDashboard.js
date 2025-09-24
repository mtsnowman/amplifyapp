import React, { useState, useEffect } from 'react';
import CityInput from './CityInput';
import WeatherDisplay from './WeatherDisplay';
import { getCurrentWeather } from '../services/weatherService';
import './WeatherDashboard.css';

/**
 * WeatherDashboard - Main component that manages weather data fetching and display
 */
const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchedCity, setLastSearchedCity] = useState('');

  // Load last searched city from localStorage on component mount
  useEffect(() => {
    const savedCity = localStorage.getItem('lastWeatherCity');
    if (savedCity) {
      setLastSearchedCity(savedCity);
      handleCitySubmit(savedCity);
    }
  }, []);

  /**
   * Handles city submission and fetches weather data
   * @param {string} city - The city name to fetch weather for
   */
  const handleCitySubmit = async (city) => {
    if (!city || city === lastSearchedCity) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getCurrentWeather(city);
      setWeatherData(data);
      setLastSearchedCity(city);
      // Save to localStorage for next visit
      localStorage.setItem('lastWeatherCity', city);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clears the current error state
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Refreshes the current weather data
   */
  const refreshWeather = () => {
    if (lastSearchedCity) {
      handleCitySubmit(lastSearchedCity);
    }
  };

  return (
    <div className="weather-dashboard">
      <div className="dashboard-header">
        <h1>Weather Dashboard</h1>
        <p>Get current weather information for any city worldwide</p>
      </div>

      <CityInput 
        onCitySubmit={handleCitySubmit}
        loading={loading}
      />

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <div className="error-content">
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button onClick={clearError} className="error-button">
              Try Again
            </button>
          </div>
        </div>
      )}

      {weatherData && !loading && !error && (
        <div className="weather-container">
          <div className="weather-actions">
            <button onClick={refreshWeather} className="refresh-button">
              🔄 Refresh
            </button>
          </div>
          <WeatherDisplay weatherData={weatherData} />
        </div>
      )}

      {!weatherData && !loading && !error && (
        <div className="welcome-container">
          <div className="welcome-icon">🌤️</div>
          <h2>Welcome to Weather Dashboard</h2>
          <p>Search for a city above to get started, or select from our popular cities!</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;