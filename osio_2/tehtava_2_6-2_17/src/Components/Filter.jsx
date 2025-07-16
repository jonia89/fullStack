export const Filter = (props) => {
    
  return (
    <div>
      <input value={props.filter} onChange={props.handleFilter} />
    </div>
  );
};
