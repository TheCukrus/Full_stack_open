import { useState, useEffect } from 'react';
import Filter from './Filter.jsx';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';
import servises from "./servises/persons.js";
import Notification from './Notification.jsx';

const App = () =>
{
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const [notification, setNotification] = useState(null);

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    //check if person exists in DB
    const check = persons.find((ele) => ele.name === newName);

    const newContact = {
      name: newName,
      number: newNumber,
    }

    if (check !== undefined)
    {
      if (!window.confirm(`${check.name} is already added to phonebook, replace the old number with a new one?`)) return;

      servises.update(check.id, newContact);
      setNotification({ "message": `Updated ${newName}`, "nameOfClass": "success" });
    }
    else
    {
      servises.post(newContact);
      setNotification({ "message": `Added ${newName}`, "nameOfClass": "success" });
    }

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
    setNotification({ "message": `Removed ${name}`, "nameOfClass": "success" });

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
  }, []);

  useEffect(() =>
  {
    setTimeout(() =>
    {
      setNotification(null)
    }, 5000)
  }, [notification])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

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