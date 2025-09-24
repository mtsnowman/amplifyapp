import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather dashboard with city input', () => {
  render(<App />);
  const cityInput = screen.getByPlaceholderText(/Enter city name/i);
  expect(cityInput).toBeInTheDocument();
  
  const getWeatherButton = screen.getByText(/Get Weather/i);
  expect(getWeatherButton).toBeInTheDocument();
});
