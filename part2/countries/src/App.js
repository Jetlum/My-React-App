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
  
  const handleFilterChange = event => setFilter(event.target.value)
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
  console.log('filter: ', filteredCountries)
  const singleCountry = filteredCountries.length === 1
  console.log("1shi",filteredCountries[0])

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
                    <img src={filteredCountries[0].flag} width="200" height="200" />
                </>
                :
                filteredCountries.map(countries => 
                  <li key={countries.id}> 
                    {countries.name} {countries.alpha2Code}
                  </li>
                )
              }
            </ul>
          </div>
      </div>
    ) 
}

export default App;
