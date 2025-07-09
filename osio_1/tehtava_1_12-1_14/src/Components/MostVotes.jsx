import { Votes } from "./Votes";

export const MostVotes = (props) => {
  const hasMOstVotes = (arr) => {
    return arr.indexOf(Math.max(...arr));
  };
  return (
    <div>
      <p>{props.anecdotes[hasMOstVotes(props.votes)]}</p>
      <Votes selected={hasMOstVotes(props.votes)} votes={props.votes} />
    </div>
  );
};
