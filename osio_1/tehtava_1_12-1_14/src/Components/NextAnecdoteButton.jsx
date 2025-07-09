export const NextAnecdoteButton = (props) => {
  const handleClick = () => {
    props.setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  return <button onClick={handleClick}>next anecdote</button>;
};