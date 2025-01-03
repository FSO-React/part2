const Country = ({ country }) => {
    return (
      <>
        <h1>{country.name.common}</h1>
        <div>capital {}</div>
        <div>area {}</div>

        <h3>languages:</h3>
        <ul>
          {Object.entries(country.languages).map(([key, lang]) => <li key={key}>{lang}</li>)}
        </ul>

        <img src={country.flags.png} alt={country.flags.alt} />
      </>
    )
}

export default Country;