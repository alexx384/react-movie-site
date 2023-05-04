import React from 'react';
import styles from './Counter.module.css';
import { COUNTER_LABEL } from '../../constants/tests.constants';

type CounterState = {
  counter: number;
};

type CounterProps = {
  initialValue: number;
};

export class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = { counter: props.initialValue };
    this.handleLabelCounterIncrement =
      this.handleLabelCounterIncrement.bind(this);
    this.handleLabelCounterDecrement =
      this.handleLabelCounterDecrement.bind(this);
  }
  handleLabelCounterIncrement() {
    this.setState((previosState) => ({ counter: previosState.counter + 1 }));
  }
  handleLabelCounterDecrement() {
    this.setState((previosState) => ({ counter: previosState.counter - 1 }));
  }
  render() {
    const label = React.createElement(
      'h1',
      { 'data-testid': COUNTER_LABEL },
      this.state.counter
    );
    const incrementButton = React.createElement(
      'button',
      {
        onClick: this.handleLabelCounterIncrement,
        className: styles.incrementButton,
      },
      'Increment'
    );
    const decrementButton = React.createElement(
      'button',
      {
        onClick: this.handleLabelCounterDecrement,
        className: styles.decrementButton,
      },
      'Decrement'
    );
    return React.createElement(
      'div',
      { className: styles.counterBlock },
      label,
      incrementButton,
      decrementButton
    );
  }
}
