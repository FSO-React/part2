import { useState } from 'react'

import Header from './components/Header'
import Input from './components/Input'
import Button from './components/Button'

const App = () => {
  // personas
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  // datos para nuevo contacto
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  // filtro por nombre
  const [filterName, setFilterName] = useState('')

  const verifyNewName = () => {
    if (persons.some(person => person.name === newName)) {
      console.log('nombre repetido>', newName)
      alert(`'${newName}' is already added to phonebook`)
      return false
    }
    if (!newName || newName.trim().length === 0) {
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
    if (!newNumber || newNumber.trim().length === 0) {
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
      number: newNumber,
      id: persons.length + 1
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

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const personsToShow = (filterName.trim().length > 0) ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())) : persons

  return (
    <div>
      <Header text='Phonebook'></Header>
      <Input text='filter shown with' value={filterName} onChange={handleFilterChange}></Input>
      <Header text='add a new'></Header>
      <form>
        <Input text='name' value={newName} onChange={handleNameChange}></Input>
        <Input text='number' value={newNumber} onChange={handleNumberChange}></Input>
        <Button text='add' onClick={addContact} type='submit'></Button>
      </form>
      <Header text='Numbers'></Header>
      {personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App