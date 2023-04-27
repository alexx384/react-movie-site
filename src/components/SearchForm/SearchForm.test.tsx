import { render, screen } from '@testing-library/react';
import { SearchForm } from './SearchForm';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

const initialSearchQuery: string = 'initial search query';

it('renders an input with the value equal to initial value passed in props', () => {
  render(<SearchForm initialSearchQuery={initialSearchQuery} />);

  const searchInput: HTMLElement = screen.getByRole('textbox');
  expect(searchInput).toHaveValue(initialSearchQuery);
});

it('calls "onSearch" prop with proper value after typing to the input and a "click" event on the Submit button', async () => {
  const userTyping: string = 'hello';
  const user: UserEvent = userEvent.setup();
  const handleSearch = jest.fn();
  render(
    <SearchForm
      initialSearchQuery={initialSearchQuery}
      onSearch={handleSearch}
    />
  );

  await user.type(screen.getByRole('textbox'), userTyping);
  await user.click(screen.getByRole('button', { name: /SEARCH/ }));

  expect(handleSearch).toBeCalledTimes(1);
  expect(handleSearch).toBeCalledWith(initialSearchQuery + userTyping);
});

it('calls "onSearch" prop with proper value after typing to the input and pressing Enter key', async () => {
  const userTyping: string = 'hello';
  const user: UserEvent = userEvent.setup();
  const handleSearch = jest.fn();

  render(
    <SearchForm
      initialSearchQuery={initialSearchQuery}
      onSearch={handleSearch}
    />
  );

  await user.type(screen.getByRole('textbox'), userTyping + '{enter}');

  expect(handleSearch).toBeCalledTimes(1);
  expect(handleSearch).toBeCalledWith(initialSearchQuery + userTyping);
});
