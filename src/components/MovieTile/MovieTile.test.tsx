import { render, screen } from '@testing-library/react';
import { MovieTile } from './MovieTile';
import { MOVIE_TILE, MENU_CONTEXT } from '../../constants/tests.constants';
import userEvent from '@testing-library/user-event';

const MOVIE_ID = '1';
const IMAGE_URL = 'https://example.com/';
const MOVIE_NAME = 'Pulp Function';
const RELEASE_YEAR = 2004;
const GENRE = 'Adventure & Comedy';

it('renders an imageUrl, movieName, releaseYear, genres with the values equal to initial value passed in props', () => {
  render(
    <MovieTile
      id={MOVIE_ID}
      imageUrl={IMAGE_URL}
      movieName={MOVIE_NAME}
      releaseYear={RELEASE_YEAR}
      genre={GENRE}
    />
  );

  const imageElement: HTMLImageElement | null = screen.queryByRole('img');
  const movieNameElement: HTMLElement | null = screen.queryByRole('heading', {
    name: MOVIE_NAME,
  });
  const releaseYearElement: HTMLElement | null = screen.queryByRole('heading', {
    name: String(RELEASE_YEAR),
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
      id={MOVIE_ID}
      imageUrl={IMAGE_URL}
      movieName={MOVIE_NAME}
      releaseYear={RELEASE_YEAR}
      genre={GENRE}
      onClick={handleClick}
    />
  );

  const movieTile: HTMLElement = screen.getByTestId(MOVIE_TILE);
  await user.click(movieTile);

  expect(handleClick).toBeCalledTimes(1);
  expect(handleClick).toBeCalledWith(MOVIE_ID);
});

it('renders with menu context', () => {
  render(
    <MovieTile
      id={MOVIE_ID}
      imageUrl={IMAGE_URL}
      movieName={MOVIE_NAME}
      releaseYear={RELEASE_YEAR}
      genre={GENRE}
    />
  );

  const menuContextElement = screen.queryByTestId(MENU_CONTEXT);

  expect(menuContextElement).toBeInTheDocument();
});
