const Persons = ({ persons, filter }) => {
    const personsToShow = (filter.trim().length > 0) ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons
    return (
        <ul>
        {personsToShow.map(person => <li key={person.id}> {person.name} {person.number} </li>)}
        </ul>
    )
}

export default Persons;