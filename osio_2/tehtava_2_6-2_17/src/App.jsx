import { useState, useEffect } from "react";
import { Filter } from "./Components/Filter";
import { PersonForm } from "./Components/PersonForm";
import { Persons } from "./Components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getPersons().then((response) => {
      setPersons(response.data);
    });
  });

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const addContact = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    const existingPerson = persons.find((person) => person.name === newName);
    // persons.map((person) => person.name).includes(newName)
    // ? alert(`${newName} is already added to phonebook`)
    existingPerson
      ? window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one ?`
        )
        ? personService
            .updatePerson(existingPerson.id, {
              ...existingPerson,
              number: newNumber,
            })
            .then((response) => {
              setPersons(
                persons.map((person) =>
                  person.id !== existingPerson.id ? response.data : person
                )
              );
            })
        : ""
      : personService.createPerson(personObject).then((response) => {
          setPersons(persons.concat(response.data));
        });
    setNewName("");
    setNewNumber("");
  };

  const deleteContact = (id, name) => {
    window.confirm(`delete ${name} ?`) ? personService.deletePerson(id) : "";
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        addContact={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        filteredPersons={filteredPersons}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
