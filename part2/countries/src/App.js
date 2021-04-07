import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [filter, setFilter] = useState('')

  const handleFilterChange = event => setFilter(event.target.value)

  return (
      <div>
          <h2>Phonebook</h2>
          <div>
            Filter <input value={value} onChange={handleFilterChange} />
          </div>
      </div>
    )
}

export default App;
