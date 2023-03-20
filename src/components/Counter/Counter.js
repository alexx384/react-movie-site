import React from 'react';

export class Counter extends React.Component {
  constructor(props) {
    super();
    this.state = { counter: props.initialValue };
    this.increment = this.onLabelCounterIncrementHandle.bind(this);
    this.decrement = this.onLabelCounterDecrementHandle.bind(this);
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
      { onClick: this.onLabelCounterIncrementHandle },
      'Incremenet'
    );
    const decrementButton = React.createElement(
      'button',
      { onClick: this.onLabelCounterDecrementHandle },
      'Decremenet'
    );
    return React.createElement(
      'section',
      null,
      label,
      incrementButton,
      decrementButton
    );
  }
}
