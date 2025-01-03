import Country from './Country'

const Persons = ({ countries, filter }) => {
    // filtrado
    const countriesToShow = (filter.trim().length > 0) ? countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase())) : countries
    console.log('countries to show', countriesToShow)

    if (countriesToShow.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      ) 
    }

    if (countriesToShow.length > 1) {
      return (
        <ul>
          {countriesToShow.map((c, ind) => <li key={ind}>{c.name.common}</li>)}
        </ul>
      )
    }

    if (countriesToShow.length === 1) {
      return (
        <Country country={countriesToShow[0]}></Country>
      )
    }
}

export default Persons;