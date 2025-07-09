export const VoteButton = (props) => {
  const handleClick = () => {
    const newVotes = [...props.votes];
    newVotes[props.selected] += 1;
    props.setVotes(newVotes);
  };
  return <button onClick={handleClick}>vote</button>;
};
