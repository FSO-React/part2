import { useState } from 'react'
import Country from './Country'

const Countries = ({ countries, filter }) => {
    // seleccion
    const [ selectedCountry, setSelectedCountry ] = useState(null)

    // filtrado
    const countriesToShow = (filter.trim().length > 0) ? countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase())) : countries
    console.log('countries to show', countriesToShow)

    const handleShowCountry = (country) => {
      if (selectedCountry && selectedCountry.name.common === country.name.common) {
        console.log('llega acaa')
        setSelectedCountry(null)
        return;
      }
      setSelectedCountry(country)
    }

    if (countriesToShow.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      ) 
    }

    if (countriesToShow.length > 1) {
      return (
        <div>
          <ul>
            {countriesToShow.map((c, ind) => (
              <li key={ind}>
                {c.name.common}{' '}
                <button onClick={() => handleShowCountry(c)}>show</button>
              </li>
            ))}
          </ul>
          {selectedCountry && <Country country={selectedCountry} />}
        </div>
      );
    }

    if (countriesToShow.length === 1) {
      return (
        <Country country={countriesToShow[0]}></Country>
      )
    }

    return null;
}

export default Countries;