import './App.css';
import { useState } from "react";
import CurrentWeather from './components/current-weather/current-weather';
import Search from './components/search/search';
import Forecast from './components/forecast/forecast';
const axios = require('axios')
function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    //current weather
    const weatherOptions = {
      method: 'GET',
      url: `http://localhost:8000/currentWeather`,
      params: {lat: lat, lon: lon}
    };
    const currentWeatherFetch = axios(weatherOptions)

    //3-hour forecast 5 days
    const forecastOptions = {
      method: 'GET',
      url: `http://localhost:8000/weatherPrediction`,
      params: {lat: lat, lon: lon}
    };
    const forecastFetch = axios(forecastOptions)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].data;
        const forecastResponse = await response[1].data;

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));

  }

  console.log(currentWeather)
  console.log(forecast)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
