import { useState, useEffect } from 'react'
import Filter from './Filter.jsx';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';
import axios from "axios";

const App = () =>
{
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  //axios fetching dbs data
  const fetchData = async () =>
  {
    const responese = await axios.get("http://localhost:3001/persons");
    console.log(responese.data);
    setPersons(responese.data)
  }

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

  //useEffects
  useEffect(() => { fetchData() }, [])

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