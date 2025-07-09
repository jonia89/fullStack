export const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>
        {props.value} {props.ending || ""}
      </td>
    </tr>
  );
};