import { useState } from 'react'

const App = () =>
{
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  //submit
  const handleSubmit = (e) =>
  {
    e.preventDefault();
    const check = persons.find((ele) => ele.name === newName);

    if (check !== undefined)
    {
      return alert(`${newName} is already added to phonebook`)
    }

    const copyPhonebook = [...persons];
    copyPhonebook.push({ name: newName, number: newNumber });
    setPersons(copyPhonebook);
    setNewName("");
    setNewNumber("");
  }

  //onchange
  const handleNameOnChange = (e) => setNewName(e.target.value)
  const handleNumberOnChange = (e) => setNewNumber(e.target.value)
  const handleSearch = (e) => setSearch(e.target.value);

  let shownContacts = persons;

  if (search !== "")
  {
    shownContacts = shownContacts.filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        <p>filer shown with <input type="search" onChange={handleSearch} /></p>
      </div>

      <h2>add a new</h2>

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

      {shownContacts.map((ele) => <p key={ele.id}>{ele.name} {ele.number}</p>)}
    </div>
  )
}

export default App