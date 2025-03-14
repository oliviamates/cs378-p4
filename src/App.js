import React, { useState } from "react";
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [cities, setCities] = useState(["Austin", "Houston", "Dallas"]); 

  function getWeather(city) {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
      .then(response => response.json())
      .then(data => {
        if (!data.results || data.results.length === 0) {
          setErrorMessage(`City "${city}" not found.`);
          return;
        }

        let latitude = data.results[0].latitude;
        let longitude = data.results[0].longitude;

        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1&timezone=auto&temperature_unit=fahrenheit`);
      })
      .then(response => response ? response.json() : null)
      .then(data => {
        if (data) {
          setWeatherData(data);
          setErrorMessage("");
        }
      })
      .catch(error => console.error("Error fetching weather data:", error));
  }

  function addCity() {
    let name = document.getElementById("city").value.trim();

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`)
      .then(response => response.json())
      .then(data => {
        if (!data.results || data.results.length === 0) {
          setErrorMessage(`City "${name}" not found.`);
          return;
        }
        if (!cities.includes(name)) {
          setCities([...cities, name]); 
        }
        setErrorMessage("");
      })
      .catch(error => console.error("Error fetching city data:", error));
  }

  return (
    <div>
      <h2 id = "title">Weather Forecast</h2>
      {cities.map((city, index) => (
        <button key={index} onClick={() => getWeather(city)}>{city}</button>
      ))}
      <br />
      <input type="text" id="city" name="city" />
      <button id="add" onClick={addCity}>+</button>
      {errorMessage && <p>{errorMessage}</p>}

      {weatherData && weatherData.hourly ? (
        <ul>
          {weatherData.hourly.temperature_2m.slice(0, 10).map((temp, index) => {
            let utcTime = new Date(weatherData.hourly.time[index] + "Z");
            let localTime = utcTime.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit', 
              hour12: true 
            });

            return <li key={index}>{localTime}: {temp}°F</li>;
          })}
        </ul>
      ) : (
        <p>Click a city to load the forecast!</p>
      )}
    </div>
  );
}

export default App;
