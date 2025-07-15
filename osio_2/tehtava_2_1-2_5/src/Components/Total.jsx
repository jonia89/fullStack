export const Total = (props) => {
  const totalExercises = Object.keys(props.parts).reduce((s, p) => {
    return Number(s) + Number(props.parts[p].exercises);
    // console.log(exercises, props.parts[exercises].exercises);
  }, 0);

  return (
    <p>
      <b>Number of exercises {totalExercises}</b>
    </p>
  );
};
