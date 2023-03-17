import { useState } from 'react';

import { Statistics } from './components/Statistics/Statistics';

import { FeedbackOptions } from './components/FeedbackOptions/FeedbackOptions';

import { Section } from './components/Section/Section';

import { Notification } from './components/Notification/Notification';

export const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = state => {
    setState(prevState => ({
      ...prevState,
      [state]: prevState[state] + 1,
    }));
  };

  const countTotalFeedbacks = () => {
    return Object.values(state).reduce((acc, val) => acc + val, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = state;
    const totalQuantity = countTotalFeedbacks();
    return totalQuantity ? Math.round((good * 100) / totalQuantity) : 0;

  
    };
      return (
        <>
          <Section title="Please leave feedback">
            <FeedbackOptions
              options={Object.keys(state)}
              onLeaveFeedback={onLeaveFeedback}
            />
          </Section>

          <Section title="Statistics">
            {countTotalFeedbacks() > 0 ? (
              <Statistics
                good={state.good}
                neutral={state.neutral}
                bad={state.bad}
                total={countTotalFeedbacks()}
                positivePercentage={countPositiveFeedbackPercentage()}
              />
            ) : (
              <Notification message="There is no feedback" />
            )}
          </Section>
        </>
      );
}
