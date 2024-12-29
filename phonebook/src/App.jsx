import { useState } from 'react'

import Header from './components/Header'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const verifyNewName = () => {
    console.log(persons)
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

  const addName = (event) => {
    event.preventDefault()
    if (!verifyNewName()) return;
    const nameObject = {
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <Header text='Phonebook'></Header>
      <form>
        <div>
          name: 
          <input
            value={newName} 
            onChange={handleNameChange} 
          />
        </div>
        <div>
          <button
            onClick={addName} 
            type="submit">add</button>
        </div>
      </form>
      <Header text='Numbers'></Header>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App