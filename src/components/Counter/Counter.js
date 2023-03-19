import React from 'react';

export class Counter extends React.Component {
  constructor(props) {
    super();
    this.state = { counter: props.initialValue };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    this.setState((previosState) => ({ counter: previosState.counter + 1 }));
  }
  decrement() {
    this.setState((previosState) => ({ counter: previosState.counter - 1 }));
  }
  render() {
    const label = React.createElement('h1', null, this.state.counter);
    const incrementButton = React.createElement(
      'button',
      { onClick: this.increment },
      'Incremenet'
    );
    const decrementButton = React.createElement(
      'button',
      { onClick: this.decrement },
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
