import { render, screen } from '@testing-library/react';
import { MovieForm, MovieInfo } from './MovieForm';
import {
  MOVIE_URL,
  RATING,
  GENRE,
  RUNTIME,
  OVERVIEW,
  SUBMIT_BUTTON,
  RESET_BUTTON,
} from '../../constants/movieForm.constants';
import userEvent from '@testing-library/user-event';
import { MOVIE_TITLE_INPUT } from '../../constants/tests.constants';

const MOVIE_INFO: MovieInfo = {
  id: '1',
  title: 'Moana',
  releaseDate: new Date('2016-11-14T00:00:00.000Z'),
  movieURL: 'https://www.moana.com',
  rating: 7.6,
  genre: new Set(['comedy']),
  runtime: 107,
  overview:
    "Moana Waialiki is a sea voyaging enthusiast and the only daughter of a chief in a long line of navigators. When her island's fishermen can't catch any fish and the crops fail, she learns that the demigod Maui caused the blight by stealing the heart of the goddess, Te Fiti. The only way to heal the island is to persuade Maui to return Te Fiti's heart, so Moana sets off on an epic journey across the Pacific. The film is based on stories from Polynesian mythology.",
};

const EMPTY_MOVIE_INFO: MovieInfo = {
  id: undefined,
  title: '',
  releaseDate: undefined,
  movieURL: '',
  rating: 0,
  genre: new Set(),
  runtime: 0,
  overview: '',
};

const TITLE_TEXT = 'HelloWorldTitle';

it('renders MovieForm labels', () => {
  render(<MovieForm />);

  const movieURLElement = screen.queryByText(MOVIE_URL);
  const ratingElement = screen.queryByText(RATING);
  const genreElement = screen.queryByText(GENRE);
  const runtimeElement = screen.queryByText(RUNTIME);
  const overviewElement = screen.queryByText(OVERVIEW);

  expect(movieURLElement).toBeInTheDocument();
  expect(ratingElement).toBeInTheDocument();
  expect(genreElement).toBeInTheDocument();
  expect(runtimeElement).toBeInTheDocument();
  expect(overviewElement).toBeInTheDocument();
});

it('returns the same filled info on submit click', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(<MovieForm movieInfo={MOVIE_INFO} onSubmit={handleSubmit} />);

  const submitButton = screen.getByRole('button', { name: SUBMIT_BUTTON });
  await user.click(submitButton);

  expect(handleSubmit).toBeCalledTimes(1);
  expect(handleSubmit).toBeCalledWith(MOVIE_INFO);
});

it('returns empty movie info for unfilled form on submit', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(<MovieForm onSubmit={handleSubmit} />);

  const submitButton = screen.getByRole('button', { name: SUBMIT_BUTTON });
  await user.click(submitButton);

  expect(handleSubmit).toBeCalledTimes(1);
  expect(handleSubmit).toBeCalledWith(EMPTY_MOVIE_INFO);
});

it('returns the filled info on submit click', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(<MovieForm onSubmit={handleSubmit} />);

  const submitButton = screen.getByRole('button', { name: SUBMIT_BUTTON });
  const titleInput = screen.getByTestId(MOVIE_TITLE_INPUT);
  await user.type(titleInput, TITLE_TEXT);
  await user.click(submitButton);

  expect(handleSubmit).toBeCalledTimes(1);
  expect(handleSubmit).toBeCalledWith({
    ...EMPTY_MOVIE_INFO,
    title: TITLE_TEXT,
  });
});

it('returns the same filled info on reset click and then on submit click', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(<MovieForm onSubmit={handleSubmit} />);

  const submitButton = screen.getByRole('button', { name: SUBMIT_BUTTON });
  const resetButton = screen.getByRole('button', { name: RESET_BUTTON });
  const titleInput = screen.getByTestId(MOVIE_TITLE_INPUT);
  await user.type(titleInput, TITLE_TEXT);
  await user.click(resetButton);
  await user.click(submitButton);

  expect(handleSubmit).toBeCalledTimes(1);
  expect(handleSubmit).toBeCalledWith(EMPTY_MOVIE_INFO);
});
