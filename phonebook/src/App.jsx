import { useState, useEffect } from 'react'
import axios from 'axios'

import Header from './components/Header'
import Input from './components/Input'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'


const App = () => {
  // personas
  const [persons, setPersons] = useState([])
  // datos para nuevo contacto
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  // filtro por nombre
  const [filterName, setFilterName] = useState('')

  const fetchPersons = async () => {
    try {
      const { status, data } = await axios.get('http://localhost:3001/persons');
      if (status === 200) setPersons(data);
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

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

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div>
      <Header text='Phonebook'></Header>
      <Input text='filter shown with' value={filterName} onChange={handleFilterChange}></Input>
      {/* input generalizado para filtro e inputs del form */}
      
      <Header text='add a new'></Header>
      <PersonsForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addContact={addContact}></PersonsForm>

      <Header text='Numbers'></Header>
      <Persons persons={persons} filter={filterName}></Persons>
    </div>
  )
}

export default App