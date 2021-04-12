import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

   useEffect(() => {
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
          const countries = response.data
          setCountries(countries)
       })
      }, [])

  const handleClick = event => setCountries([countries.find(country => country.name === event.target.id)]);
  
  const handleFilterChange = event => setFilter(event.target.value)
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
  const singleCountry = filteredCountries.length === 1
  const multipleCountries = (filteredCountries.length > 10 && filteredCountries.length < countries.length)

  return (
      <div>
          <Filter value={filter} onChange={handleFilterChange} />
          <div>
            <ul>
              { singleCountry ?
                <>
                   <h1> {filteredCountries[0].name} </h1>
                    <p> Capital: {filteredCountries[0].capital}</p>
                    <p> Population: {filteredCountries[0].population}</p>
                    <h1> Languages</h1>
                      <ul>
                        {filteredCountries[0].languages.map(lang => 
                          <li key={lang.iso639_1}> 
                            {lang.name}
                          </li>
                        )}
                      </ul>
                    <img src={filteredCountries[0].flag} alt='Country flag' width="200" height="200" />
                </> :
                multipleCountries ? 
                  <>
                    <p> Too many matches, specify another filter</p>
                  </>
                :
                filteredCountries.map(country => 
                  <li key={country.id}> 
                    {country.name} {country.alpha2Code}
                    <button id={country.name} onClick={handleClick}>Show</button>
                  </li>
                )
              }
            </ul>
          </div>
      </div>
    ) 
}

export default App;