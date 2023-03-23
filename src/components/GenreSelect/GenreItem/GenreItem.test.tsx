import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { GenreItem } from './GenreItem';

const genreName = 'ALL';

it('renders a genreName', () => {
  render(<GenreItem genreName={genreName} isSelected={true} />);

  const listItem: HTMLLIElement = screen.getByRole('listitem');
  expect(listItem).toHaveTextContent(genreName);
});

it('renders list items with different classes based on isSelected attribute', () => {
  render(
    <>
      <GenreItem genreName={genreName} isSelected={true} />
      <GenreItem genreName={genreName} isSelected={false} />
    </>
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
  const handleSelect = jest.fn();
  render(
    <GenreItem
      genreName={genreName}
      isSelected={true}
      onSelect={handleSelect}
    />
  );

  await user.click(screen.getByRole('listitem'));

  expect(handleSelect).toBeCalledTimes(1);
  expect(handleSelect).toBeCalledWith(genreName);
});
