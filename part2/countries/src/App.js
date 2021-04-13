import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

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

  const handleFilterChange = event => setFilter(event.target.value);

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      {filteredCountries.length > 0 && <Countries filteredCountries={filteredCountries} initialCountries={countries} />}
    </div>
  );
};

export default App;