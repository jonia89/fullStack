export const Persons = (props) => {

  return <div>{props.filteredPersons.map((person, index) => (
        <p key={index}>
          {person.name} {person.number} <button onClick={() => props.deleteContact(person.id, person.name)}>delete</button>
        </p>
      ))}</div>;
};
