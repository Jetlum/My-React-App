import React from 'react'
//import DisplayCountries from './components/DisplayCountries'

const Countries = ({ countries, filteredCountries }) => {
	
  	const singleCountry = filteredCountries.length === 1
  	const multipleCountries = (filteredCountries.length > 10 && filteredCountries.length < countries.length)
  	//const handleClick = event => setCountries([countries.find(country => country.name === event.target.id)]);
	//<button id={country.name} onClick={handleClick}>Show</button>

	return (
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
                  </li>
                )
              }
            </ul>
	)

}

export default Countries