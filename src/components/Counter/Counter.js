import React from 'react';
import './Counter.css';

export class Counter extends React.Component {
  constructor(props) {
    super();
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
        className: 'incrementButton',
      },
      'Incremenet'
    );
    const decrementButton = React.createElement(
      'button',
      {
        onClick: this.onLabelCounterDecrementHandle,
        className: 'decrementButton',
      },
      'Decremenet'
    );
    return React.createElement(
      'div',
      { className: 'counterBlock' },
      label,
      incrementButton,
      decrementButton
    );
  }
}
