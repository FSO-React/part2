import { useState } from 'react'

import Header from './components/Header'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const verifyNewName = () => {
    if (persons.some(person => person.name === newName)) {
      console.log('nombre repetido>', newName)
      alert(`'${newName}' is already added to phonebook`)
      return false
    }
    if (!newName || newName.length === 0) {
      console.log('nombre nulo')
      alert(`enter a valid name to add`)
      return false
    }
    return true
  }

  const verifyNewNumber = () => {
    if (persons.some(person => person.number === newNumber)) {
      console.log('numero repetido>', newNumber )
      alert(`'${newNumber}' is already added to phonebook`)
      return false
    }
    if (!newNumber || newNumber.length === 0) {
      console.log('numero nulo')
      alert(`enter a valid number to add`)
      return false
    }
    return true
  }

  const addContact = (event) => {
    event.preventDefault()
    if (!verifyNewName()) return;
    if (!verifyNewNumber()) return;
    const contactObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(contactObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Header text='Phonebook'></Header>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
          <button onClick={addContact} type="submit"> add </button>
      </form>
      <Header text='Numbers'></Header>
      {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App