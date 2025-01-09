import contactService from './services/contacs'
import { useState, useEffect } from 'react'

import Header from './components/Header'
import Input from './components/Input'
import Persons from './components/Persons'
import PersonsForm from './components/PersonsForm'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const fetchPersons = async () => {
    await contactService.getAll()
      .then(({ data }) => {
        setPersons(data);
      })
      .catch(error => {
        console.error('Error fetching persons:', error);
      });
  };

  const addContact = async (event) => {
    event.preventDefault()
    if (!verifyNewName()) return;
    if (!verifyNewNumber()) return;
    const contactObject = {
      name: newName,
      number: newNumber,
    }

    await contactService.create(contactObject)
      .then(({ data }) => {
        setPersons(persons.concat(data))
        setSuccessMessage(`The contact ${contactObject.name} has been added properly`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000);
      })
      .catch(error => {
        console.error('Error adding person:', error);
      });
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = async ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`)) {
      await contactService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(`The contact ${name} has been removed from server`)
        })
        .catch(error => {
          setErrorMessage(`The contact ${name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
          setPersons(persons.filter(person => person.id !== id))
        });
    }
  }

  const updatePerson = async (id, newContact) => {
    await contactService.update(id, newContact)
      .then(({ data }) => {
        setPersons(persons.map(person => person.id !== id ? person : data))
        setSuccessMessage(`The contact ${data.name} changed properly to the phonenumber ${data.number}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(() => {
        console.error('Error updating person:', error);        
      });
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

  const verifyNewName = () => {
    if (persons.some(person => person.name === newName)) {
      console.log('nombre repetido>', newName)
      if (window.confirm(`'${newName}' is already added to phonebook, replace the old number with a new one?`)) {
        if (!verifyNewNumber()) return;
        const person = persons.find(person => person.name === newName)
        const updatedPerson = { ...person, number: newNumber }
        updatePerson(person.id, updatedPerson)
      }
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

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div>
      <Header text='Phonebook'></Header>
      <Notification status='success' message={successMessage}></Notification>
      <Notification status='error' message={errorMessage}></Notification>
      <Input text='filter shown with' value={filterName} onChange={handleFilterChange}></Input>
      {/* input generalizado para filtro e inputs del form */}
      
      <Header text='add a new'></Header>
      <PersonsForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addContact={addContact}></PersonsForm>

      <Header text='Numbers'></Header>
      <Persons persons={persons} filter={filterName} deletePerson={deletePerson}></Persons>
    </div>
  )
}

export default App