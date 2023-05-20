import { useState } from 'react'

const App = () =>
{
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    const check = persons.find((ele) => ele.name === newName);

    if (check !== undefined)
    {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const temp = [...persons];
    temp.push({ name: newName });
    setPersons(temp);
    setNewName("")
  }

  const handleOnChange = (e) => setNewName(e.target.value);


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" onChange={handleOnChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((ele) => <p key={ele.name}>{ele.name}</p>)}
    </div>
  )
}

export default App