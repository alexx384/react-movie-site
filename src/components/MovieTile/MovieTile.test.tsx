import { render, screen } from '@testing-library/react';
import { MovieTile } from './MovieTile';
import { MOVIE_TILE, MENU_CONTEXT } from '../../constants/tests.constants';
import userEvent from '@testing-library/user-event';

it('renders an imageUrl, movieName, releaseYear, genres with the values equal to initial value passed in props', () => {
  const imageUrl = 'https://example.com/';
  const movieName = 'Pulp Function';
  const releaseYear = 2004;
  const genre = 'Adventure & Comedy';
  render(
    <MovieTile
      imageUrl={imageUrl}
      movieName={movieName}
      releaseYear={releaseYear}
      genre={genre}
    />
  );

  const imageElement: HTMLImageElement | null = screen.queryByRole('img');
  const movieNameElement: HTMLElement | null = screen.queryByRole('heading', {
    name: movieName,
  });
  const releaseYearElement: HTMLElement | null = screen.queryByRole('heading', {
    name: String(releaseYear),
  });
  const genreElement: HTMLElement | null = screen.queryByRole('heading', {
    name: genre,
  });

  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('src', imageUrl);
  expect(movieNameElement).toBeInTheDocument();
  expect(releaseYearElement).toBeInTheDocument();
  expect(genreElement).toBeInTheDocument();
});

it('invokes an onClick with movie name on movie tile click', async () => {
  const user = userEvent.setup();
  const movieName = 'Pulp Function';
  const handleClick = jest.fn();
  render(
    <MovieTile
      imageUrl="https://example.com/"
      movieName={movieName}
      releaseYear={2004}
      genre={'Adventure & Comedy'}
      onClick={handleClick}
    />
  );

  const movieTile: HTMLElement = screen.getByTestId(MOVIE_TILE);
  await user.click(movieTile);

  expect(handleClick).toBeCalledTimes(1);
  expect(handleClick).toBeCalledWith(movieName);
});

it('renders with menu context', () => {
  render(
    <MovieTile
      imageUrl="https://example.com/"
      movieName="Pulp Function"
      releaseYear={2004}
      genre={'Adventure & Comedy'}
    />
  );

  const menuContextElement = screen.queryByTestId(MENU_CONTEXT);

  expect(menuContextElement).toBeInTheDocument();
});
