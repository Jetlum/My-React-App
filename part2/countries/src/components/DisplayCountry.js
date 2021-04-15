import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather';

const DisplayCountry = ({ name, capital, population, languages, flag }) => {
    
		const [weatherData, setWeatherData] = useState();
  
  	const languageList = languages.map(({ name }) => <li key={name}>{name}</li>);
  	useEffect(() => {
      let didCancel = false;
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    	axios
     		.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`)
          	.then(response => {
              if (!didCancel) {
                setWeatherData(response.data);
              }
      });

      return () => {
        didCancel = true;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  	return (
    	<div>
	      	<h1>{name}</h1>
	      	<p>Capital: {capital}</p>
	      	<p>Population: {population}</p>
	      	<p>Languages:</p>
	      	<ul>{languageList}</ul>
	      	<img src={flag} alt="Flag of the country" width="200" height="200" />
	      	{weatherData && <Weather weatherData={weatherData} />}
      </div>
  	);
};

export default DisplayCountry;