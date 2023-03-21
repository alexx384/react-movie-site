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
    this.onLabelCounterIncrementHandle =
      this.onLabelCounterIncrementHandle.bind(this);
    this.onLabelCounterDecrementHandle =
      this.onLabelCounterDecrementHandle.bind(this);
  }
  onLabelCounterIncrementHandle() {
    this.setState((previosState) => ({ counter: previosState.counter + 1 }));
  }
  onLabelCounterDecrementHandle() {
    this.setState((previosState) => ({ counter: previosState.counter - 1 }));
  }
  render() {
    const label = React.createElement('h1', null, this.state.counter);
    const incrementButton = React.createElement(
      'button',
      {
        onClick: this.onLabelCounterIncrementHandle,
        className: styles.incrementButton,
      },
      'Incremenet'
    );
    const decrementButton = React.createElement(
      'button',
      {
        onClick: this.onLabelCounterDecrementHandle,
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
