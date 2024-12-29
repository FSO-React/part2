import { useState } from 'react'

import Header from './components/Header'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (!newName || newName === 0) return;
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