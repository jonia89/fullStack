import { StatisticLine } from "./StatisticLine";

export const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.feedback.good} />
        <StatisticLine text="neutral" value={props.feedback.neutral} />
        <StatisticLine text="bad" value={props.feedback.bad} />
        <StatisticLine text="all" value={props.total} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" value={props.positive} ending="%" />
      </tbody>
    </table>
  );
};
