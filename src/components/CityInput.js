import React, { useState } from 'react';
import './CityInput.css';

/**
 * CityInput component - Allows user to input/select a city for weather lookup
 * @param {Object} props - Component props
 * @param {Function} props.onCitySubmit - Callback function when city is submitted
 * @param {boolean} props.loading - Whether a weather request is in progress
 */
const CityInput = ({ onCitySubmit, loading }) => {
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Popular cities for quick selection
  const popularCities = [
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney',
    'Los Angeles', 'Berlin', 'Toronto', 'Barcelona', 'Rome',
    'Amsterdam', 'Dubai', 'Singapore', 'Mumbai', 'Bangkok'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const cityToSubmit = city.trim() || selectedCity;
    if (cityToSubmit && !loading) {
      onCitySubmit(cityToSubmit);
    }
  };

  const handleCitySelect = (selectedCityName) => {
    setSelectedCity(selectedCityName);
    setCity('');
    if (!loading) {
      onCitySubmit(selectedCityName);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setSelectedCity('');
  };

  return (
    <div className="city-input-container">
      <form onSubmit={handleSubmit} className="city-form">
        <div className="input-group">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city name..."
            className="city-input"
            disabled={loading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={loading || (!city.trim() && !selectedCity)}
          >
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </div>
      </form>

      <div className="popular-cities">
        <h3>Popular Cities</h3>
        <div className="cities-grid">
          {popularCities.map((cityName) => (
            <button
              key={cityName}
              onClick={() => handleCitySelect(cityName)}
              className={`city-button ${selectedCity === cityName ? 'selected' : ''}`}
              disabled={loading}
            >
              {cityName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityInput;