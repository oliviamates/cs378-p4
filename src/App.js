import React, { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  function getWeather(city) {
    let latitude, longitude;

    if (city === "Austin") {
      latitude = 30.2672;
      longitude = -97.7431;
    } else if (city === "Houston") {
      latitude = 29.7601;
      longitude = -95.3701;  
    } else {
      latitude = 32.7767;  
      longitude = -96.7970;
    }
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1&timezone=auto&temperature_unit=fahrenheit`)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error("Error fetching weather data:", error));
  }

  function typedCity(){
      let name = document.getElementById("city").value;
      if(name === "Austin" || name === "Houston" || name === "Dallas") {
        getWeather(name); 
      }
      else {
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`)
        .then(response => response.json())
        .then(data => {
          let latitude = data.results[0].latitude; 
          let longitude = data.results[0].longitude;
          return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1&timezone=auto&temperature_unit=fahrenheit`)
        })
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error("Error fetching weather data:", error));
      }
  }

  return (
    <div>
      <h2>Weather Forecast</h2>
      <button onClick={() => getWeather("Austin")}>Austin</button>
      <button onClick={() => getWeather("Houston")}>Houston</button>
      <button onClick={() => getWeather("Dallas")}>Dallas</button>
      <br></br>
      <input type="text" id="city" name="city"/>
      <button id = "add" onClick={() => typedCity()}>+</button>

      {weatherData ? (
        <div>
          <p>Temperature: {weatherData.hourly.temperature_2m[0]}°F</p>
        </div>
      ) : (
        <p>Click a city to load the forecast!</p>
      )}

    </div>
  );
}

export default App;
