import { useState, useEffect } from 'react';
import Filter from './Filter.jsx';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';
import servises from "./servises/persons.js";

const App = () =>
{
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    //check if person exists in DB
    const check = persons.find((ele) => ele.name === newName);

    if (check !== undefined)
    {
      return alert(`${newName} is already added to phonebook`)
    }

    const newContact = {
      name: newName,
      number: newNumber,
    }

    servises.post(newContact);
    servises.getAll().then(persons => { setPersons(persons) })

    setNewName("");
    setNewNumber("");
  }

  const handleDelete = (id, name) =>
  {
    if (!window.confirm(`Delete ${name}?`)) return;

    servises.remove(id);
    servises.getAll()
      .then(persons => { setPersons(persons) })

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

  //useEffects
  useEffect(() =>
  {
    servises.getAll()
      .then(persons => { setPersons(persons) })
  }, [])

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

      <Persons
        shownContacts={shownContacts}
        handleDelete={handleDelete}
      />

    </div>
  )
}

export default App