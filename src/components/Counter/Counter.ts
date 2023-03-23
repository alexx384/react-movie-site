import React from 'react';
import styles from './Counter.module.css';

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
      { 'data-testid': 'counterLabel' },
      this.state.counter
    );
    const incrementButton = React.createElement(
      'button',
      {
        onClick: this.handleLabelCounterIncrement,
        className: styles.incrementButton,
      },
      'Incremenet'
    );
    const decrementButton = React.createElement(
      'button',
      {
        onClick: this.handleLabelCounterDecrement,
        className: styles.decrementButton,
      },
      'Decremenet'
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
