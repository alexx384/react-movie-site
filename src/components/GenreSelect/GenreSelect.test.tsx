import { render, screen } from '@testing-library/react';
import { GenreSelect } from './GenreSelect';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import {
  GENRE_ITEM_SELECTED,
  GENRE_ITEM_UNSELECTED,
} from '../../constants/tests.constants';
import { Tuple } from '../../utils';

const listOfGenres: Tuple<string, 6> = [
  'ALL',
  'COMEDY',
  'HORROR',
  'THRILLER',
  'DRAMA',
  'ADVENTURE',
];

it('renders all genres passed in props', () => {
  const initiallySelectedGenreName = listOfGenres[0];
  render(
    <GenreSelect
      listOfGenres={[...listOfGenres]}
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
      listOfGenres={[...listOfGenres]}
      initiallySelectedGenreName={initiallySelectedGenreName}
    />
  );

  const selectedGenreItem: HTMLLIElement =
    screen.getByTestId(GENRE_ITEM_SELECTED);
  expect(selectedGenreItem).toBeInTheDocument();
  expect(selectedGenreItem).toHaveTextContent(initiallySelectedGenreName);
});

it('calls "onSelectGenre" callback and passes correct genre in arguments after a click event on a genre button', async () => {
  const initiallySelectedGenreName: string = listOfGenres[0];
  const user: UserEvent = userEvent.setup();
  const handleSelectGenre = jest.fn();
  render(
    <GenreSelect
      listOfGenres={[...listOfGenres]}
      initiallySelectedGenreName={initiallySelectedGenreName}
      onSelectGenre={handleSelectGenre}
    />
  );
  const unselectedGenreItems: HTMLElement[] = screen.getAllByTestId(
    GENRE_ITEM_UNSELECTED
  );
  const unselectedGenreItem = unselectedGenreItems[0] as HTMLElement;

  await user.click(unselectedGenreItem);

  expect(handleSelectGenre).toBeCalledTimes(1);
  expect(handleSelectGenre).toBeCalledWith(unselectedGenreItem.textContent);
});

it('not highlights a selected genre when it is not from the list', () => {
  const initiallySelectedGenreName = 'UNKNOWN';
  render(
    <GenreSelect
      listOfGenres={[]}
      initiallySelectedGenreName={initiallySelectedGenreName}
    />
  );

  expect(screen.queryByTestId(GENRE_ITEM_SELECTED)).toBeNull();
});
