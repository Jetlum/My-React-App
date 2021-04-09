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

  console.log('Countries outside: ', countries)
  const handleFilterChange = event => setFilter(event.target.value)
  console.log(filter)
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
  console.log('filter: ', filteredCountries)
  
  return (
      <div>
          <Filter value={filter} onChange={handleFilterChange} />
          <div>
            <ul>
              {filteredCountries.map(countries => 
                <li key={countries.id}>{countries.name} {countries.alpha2Code}</li>
              )}
            </ul>
          </div>
      </div>
    ) 
}

export default App;
