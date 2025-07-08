import { useState } from "react";

const Statistics = (props) => {
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

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>
        {props.value} {props.ending || ""}
      </td>
    </tr>
  );
};

const Button = (props) => {
  return <button onClick={props.onClickHandler}>{props.text}</button>;
};

function App() {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });
  const total = feedback.good + feedback.neutral + feedback.bad;
  const average = (feedback.good - feedback.bad) / total || 0;
  const positive = (feedback.good / total) * 100 || 0;

  const setGoodHandler = () => {
    setFeedback((prev) => ({
      ...prev,
      good: prev.good + 1,
    }));
  };
  const setNeutralHandler = () => {
    setFeedback((prev) => ({
      ...prev,
      neutral: prev.neutral + 1,
    }));
  };
  const setBadHandler = () => {
    setFeedback((prev) => ({
      ...prev,
      bad: prev.bad + 1,
    }));
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClickHandler={setGoodHandler} text="good" />
        <Button onClickHandler={setNeutralHandler} text="neutral" />
        <Button onClickHandler={setBadHandler} text="bad" />
      </div>
      <h1>statistic</h1>
      {total > 0 ? (
        <Statistics
          feedback={feedback}
          total={total}
          average={average}
          positive={positive}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
}

export default App;
