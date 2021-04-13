import React from 'react';

const DisplayCountries = ({ countries, handleClick }) => (
  
  <ul>
    {countries.map(({ name }) => (
      <li key={name}>
        {name}
        <button id={name} onClick={handleClick}>
          Show
        </button>
      </li>
    ))}
  </ul>
);

export default DisplayCountries;