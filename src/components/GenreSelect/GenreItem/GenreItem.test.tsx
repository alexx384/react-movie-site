import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { GenreItem } from './GenreItem';

const genreName = 'ALL';

it('renders a genreName', () => {
  render(
    <GenreItem genreName={genreName} isSelected={true} onSelect={() => {}} />
  );

  const listItem: HTMLLIElement = screen.getByRole('listitem');
  expect(listItem).toHaveTextContent(genreName);
});

it('renders list items with different classes based on isSelected attribute', () => {
  render(
    <GenreItem genreName={genreName} isSelected={true} onSelect={() => {}} />
  );
  render(
    <GenreItem genreName={genreName} isSelected={false} onSelect={() => {}} />
  );

  const selectedListItem: HTMLLIElement =
    screen.getByTestId('selectedGenreItem');
  const unselectedListItem: HTMLLIElement = screen.getByTestId(
    'unselectedGenreItem'
  );
  expect(selectedListItem.className).not.toEqual(unselectedListItem.className);
});

it('invokes "onSelect" with correct property on click', async () => {
  const user: UserEvent = userEvent.setup();
  const onSelectHandler = jest.fn();
  render(
    <GenreItem
      genreName={genreName}
      isSelected={true}
      onSelect={onSelectHandler}
    />
  );

  await user.click(screen.getByRole('listitem'));

  expect(onSelectHandler).toBeCalledTimes(1);
  expect(onSelectHandler).toBeCalledWith(genreName);
});
