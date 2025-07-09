import { useState } from "react";
import { Statistics } from "./Compoents/Statistics.jsx";
import { Button } from "./Compoents/Button.jsx";

const App = () => {
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
};

export default App;
