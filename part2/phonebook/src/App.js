import { useState } from 'react'

const App = () =>
{
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    const check = persons.find((ele) => ele.name === newName);

    if (check !== undefined)
    {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const copyPhonebook = [...persons];
    copyPhonebook.push({ name: newName, number: newNumber });
    setPersons(copyPhonebook);
    setNewName("");
    setNewNumber("");
  }

  const handleNameOnChange = (e) => setNewName(e.target.value)
  const handleNumberOnChange = (e) => setNewNumber(e.target.value)





  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" onChange={handleNameOnChange} value={newName} />
        </div>
        <div>
          number: <input type="text" onChange={handleNumberOnChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((ele) => <p key={ele.name}>{ele.name} {ele.number}</p>)}
    </div>
  )
}

export default App