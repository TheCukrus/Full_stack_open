import { useState } from 'react'
import Filter from './Filter.jsx';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';

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

      <Filter handleSearch={handleSearch} />

      <h3>add a new</h3>

      <PersonForm
        handleNameOnChange={handleNameOnChange}
        handleNumberOnChange={handleNumberOnChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>

      <Persons shownContacts={shownContacts} />

    </div>
  )
}

export default App