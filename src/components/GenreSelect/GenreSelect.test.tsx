import { render, screen } from '@testing-library/react';
import { GenreSelect } from './GenreSelect';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

const listOfGenres: string[] = [
  'ALL',
  'COMEDY',
  'HORROR',
  'THRILLER',
  'DRAMA',
  'ADVENTURE',
];

it('renders all genres passed in props', () => {
  const initiallySelectedGenreName: string = listOfGenres[0];
  render(
    <GenreSelect
      listOfGenres={listOfGenres}
      initiallySelectedGenreName={initiallySelectedGenreName}
    />
  );

  const genreList: HTMLLIElement[] = screen.getAllByRole('listitem');
  const genreContentList: (string | null)[] = genreList.map(
    (item) => item.textContent
  );
  expect(genreContentList).toEqual(listOfGenres);
});

it('highlights a selected genre passed in props', () => {
  const initiallySelectedGenreName: string = listOfGenres[0];
  render(
    <GenreSelect
      listOfGenres={listOfGenres}
      initiallySelectedGenreName={initiallySelectedGenreName}
    />
  );

  const selectedGenreItem: HTMLLIElement =
    screen.getByTestId('selectedGenreItem');
  expect(selectedGenreItem).toBeInTheDocument();
});

it('calls "onSelectGenre" callback and passes correct genre in arguments after a click event on a genre button', async () => {
  const initiallySelectedGenreName: string = listOfGenres[0];
  const user: UserEvent = userEvent.setup();
  const onSelectGenreHandler = jest.fn();
  render(
    <GenreSelect
      listOfGenres={listOfGenres}
      initiallySelectedGenreName={initiallySelectedGenreName}
      onSelectGenre={onSelectGenreHandler}
    />
  );
  const unselectedGenreItem: HTMLElement = screen.getAllByTestId(
    'unselectedGenreItem'
  )[0];

  await user.click(unselectedGenreItem);

  expect(onSelectGenreHandler).toBeCalledTimes(1);
  expect(onSelectGenreHandler).toBeCalledWith(unselectedGenreItem.textContent);
});

it('not highlights a selected genre when it is not from the list', () => {
  const initiallySelectedGenreName: string = 'UNKNOWN';
  render(
    <GenreSelect
      listOfGenres={[]}
      initiallySelectedGenreName={initiallySelectedGenreName}
    />
  );

  expect(screen.queryByTestId('selectedGenreItem')).toBeNull();
});
