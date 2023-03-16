import React from 'react';

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: props.initialValue };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
  render() {
    const label = React.createElement('h1', null, `${this.state.count}`);
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
