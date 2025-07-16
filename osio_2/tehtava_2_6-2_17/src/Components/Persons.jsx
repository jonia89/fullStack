export const Persons = (props) => {
  return <div>{props.filteredPersons.map((person, index) => (
        <p key={index}>
          {person.name} {person.number}
        </p>
      ))}</div>;
};
