import React from 'react';

const Weather = ({ weatherData }) => {
 	const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
  	return (
	    <div>
	     	<h1>Weather in {weatherData.name}</h1>
	      		 <span>
	            <b>Temperature: </b>
	             {weatherData.main.temp} Celcius
	          </span>
	          <div>
	            <img src={weatherIcon} alt="Weather icons" width="100" height="100" />
	          </div>
	          <span>
	            <b>Wind: </b>
	            {weatherData.wind.speed} kph {weatherData.wind.deg} degree
	          </span>
	    </div>
  	);
};

export default Weather;