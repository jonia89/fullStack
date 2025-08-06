export const Filter = (props) => {

  return (
    <div>
      <p>find countries</p>
      <input value={props.filter} onChange={props.handleFilter} />
    </div>
  );
};
