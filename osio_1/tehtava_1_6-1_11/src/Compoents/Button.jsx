export const Button = (props) => {
  return <button onClick={props.onClickHandler}>{props.text}</button>;
};