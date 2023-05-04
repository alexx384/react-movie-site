import React from 'react';
import { render, screen } from '@testing-library/react';
import { Counter } from './Counter';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { COUNTER_LABEL } from '../../constants/tests.constants';

const initialValue: number = 25;

it('renders initial value in counter label', () => {
  render(React.createElement(Counter, { initialValue: initialValue }));

  const counterLabel: HTMLElement = screen.getByTestId(COUNTER_LABEL);
  expect(counterLabel).toHaveTextContent(String(initialValue));
});

it('decrements the counter value on decrement button click', async () => {
  const user: UserEvent = userEvent.setup();

  render(React.createElement(Counter, { initialValue: initialValue }));
  await user.click(screen.getByRole('button', { name: 'Decrement' }));

  const counterLabel: HTMLElement = screen.getByTestId(COUNTER_LABEL);
  expect(counterLabel).toHaveTextContent(String(initialValue - 1));
});

it('increments the counter value on increment button click', async () => {
  const user: UserEvent = userEvent.setup();

  render(React.createElement(Counter, { initialValue: initialValue }));
  await user.click(screen.getByRole('button', { name: 'Increment' }));

  const counterLabel: HTMLElement = screen.getByTestId(COUNTER_LABEL);
  expect(counterLabel).toHaveTextContent(String(initialValue + 1));
});
