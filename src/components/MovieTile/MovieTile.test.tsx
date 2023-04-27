import { render, screen } from '@testing-library/react';
import { MovieTile } from './MovieTile';
import {
  THREE_DOTS_BUTTON_BLOCK,
  MOVIE_TILE_IMAGE,
} from '../../constants/tests.constants';
import userEvent from '@testing-library/user-event';

const MOVIE_ID = 1;
const IMAGE_URL = 'https://example.com/';
const MOVIE_NAME = 'Pulp Function';
const RELEASE_DATE = new Date(2004, 0);
const GENRES = new Set(['adventure', 'comedy']);
const GENRE = 'Adventure & Comedy';

it('renders an imageUrl, movieName, releaseYear, genres with the values equal to initial value passed in props', () => {
  render(
    <MovieTile
      info={{
        id: MOVIE_ID,
        movieURL: IMAGE_URL,
        title: MOVIE_NAME,
        releaseDate: RELEASE_DATE,
        genreIds: GENRES,
      }}
    />
  );

  const imageElement: HTMLImageElement | null = screen.queryByRole('img');
  const movieNameElement: HTMLElement | null = screen.queryByRole('heading', {
    name: MOVIE_NAME,
  });
  const releaseYearElement: HTMLElement | null = screen.queryByRole('heading', {
    name: String(RELEASE_DATE.getFullYear()),
  });
  const genreElement: HTMLElement | null = screen.queryByRole('heading', {
    name: GENRE,
  });

  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('src', IMAGE_URL);
  expect(movieNameElement).toBeInTheDocument();
  expect(releaseYearElement).toBeInTheDocument();
  expect(genreElement).toBeInTheDocument();
});

it('invokes an onClick with movie name on movie tile click', async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  render(
    <MovieTile
      info={{
        id: MOVIE_ID,
        movieURL: IMAGE_URL,
        title: MOVIE_NAME,
        releaseDate: RELEASE_DATE,
        genreIds: new Set([GENRE]),
      }}
      onClick={handleClick}
    />
  );

  const movieTile: HTMLElement = screen.getByTestId(MOVIE_TILE_IMAGE);
  await user.click(movieTile);

  expect(handleClick).toBeCalledTimes(1);
  expect(handleClick).toBeCalledWith(MOVIE_ID);
});

it('renders with menu context', () => {
  render(
    <MovieTile
      info={{
        id: MOVIE_ID,
        movieURL: IMAGE_URL,
        title: MOVIE_NAME,
        releaseDate: RELEASE_DATE,
        genreIds: GENRES,
      }}
    />
  );

  const menuContextElement = screen.queryByTestId(THREE_DOTS_BUTTON_BLOCK);

  expect(menuContextElement).toBeInTheDocument();
});
