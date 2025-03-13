import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,wind_speed_10m&forecast_days=7&timezone=auto")
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error("Error fetching weather data:", error));
  }, []); // Empty dependency array means it runs once when the component mounts.

  return (
    <div className="container">
      <h4 id="tagline">Weather Forecast</h4>
      {weatherData ? (
        <div>
          <p>Location: Berlin</p>
          <p>Temperature (Current): {weatherData.hourly.temperature_2m[0]}°C</p>
          <p>Wind Speed (Current): {weatherData.hourly.wind_speed_10m[0]} km/h</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default App;
