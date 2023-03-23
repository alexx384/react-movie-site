import React from 'react';
import { render, screen } from '@testing-library/react';
import { Counter } from './Counter';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

const initialValue: number = 25;

it('renders initial value in counter label', () => {
  render(React.createElement(Counter, { initialValue: initialValue }));

  const counterLabel: HTMLElement = screen.getByTestId('counterLabel');
  expect(counterLabel).toHaveTextContent(String(initialValue));
});

it('decrements the counter value on decrement button click', async () => {
  const user: UserEvent = userEvent.setup();

  render(React.createElement(Counter, { initialValue: initialValue }));
  await user.click(screen.getByRole('button', { name: /decremenet/i }));

  const counterLabel: HTMLElement = screen.getByTestId('counterLabel');
  expect(counterLabel).toHaveTextContent(String(initialValue - 1));
});

it('incremenets the counter value on increment button click', async () => {
  const user: UserEvent = userEvent.setup();

  render(React.createElement(Counter, { initialValue: initialValue }));
  await user.click(screen.getByRole('button', { name: /incremenet/i }));

  const counterLabel: HTMLElement = screen.getByTestId('counterLabel');
  expect(counterLabel).toHaveTextContent(String(initialValue + 1));
});
