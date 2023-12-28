import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';





function WeatherApp() {
  const [cityName, setCityName] = useState('Dahod, In'); // Initial city
 // const [weatherData, setWeatherData] = useState(null);
  const [temperature, setTemperature] = useState(32); // Initial temperature
  const [description, setDescription] = useState('Clouds'); // Initial description

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "e38d84bcfd7329c75c694511d746ee3d";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
       // setWeatherData(data);
        setTemperature(data.main.temp - 273.15); // Convert to Celsius
        setDescription(data.weather[0].main);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [cityName]); // Refetch weather only when cityName changes

  const handleSearch = () => {
    setCityName(document.getElementById("search-text").value);
    
  };

  return (
    <div className="box">
      <input id="search-text" type="search" placeholder="search" className="search" />
      <FontAwesomeIcon icon={faSearch}  onClick={handleSearch} className='search-icon'/>
      
      <h1>{cityName}</h1>
      <img src="clouds.png" alt="" />
      <h2 id="temp">{temperature.toFixed(1)}° C</h2>
      <div className="week">
        <p id="p3">{description}</p>
        <p id ="p2"></p>
        <p id ="p3"></p>
      </div>
    </div>
  );
}

export default WeatherApp;

