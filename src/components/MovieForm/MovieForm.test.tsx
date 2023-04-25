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
  TEST_MOVIE_INFO,
} from '../../constants/movieForm.constants';
import userEvent from '@testing-library/user-event';
import { MOVIE_TITLE_INPUT } from '../../constants/tests.constants';

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

  render(<MovieForm movieInfo={TEST_MOVIE_INFO} onSubmit={handleSubmit} />);

  const submitButton = screen.getByRole('button', { name: SUBMIT_BUTTON });
  await user.click(submitButton);

  expect(handleSubmit).toBeCalledTimes(1);
  expect(handleSubmit).toBeCalledWith(TEST_MOVIE_INFO);
});

it('does not return unfilled form on submit', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(<MovieForm onSubmit={handleSubmit} />);

  const submitButton = screen.getByRole('button', { name: SUBMIT_BUTTON });
  await user.click(submitButton);

  expect(handleSubmit)['not'].toBeCalled();
});

it('returns the filled form with title change and submit click', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(<MovieForm movieInfo={TEST_MOVIE_INFO} onSubmit={handleSubmit} />);

  const submitButton = screen.getByRole('button', { name: SUBMIT_BUTTON });
  // const resetButton = screen.getByRole('button', { name: RESET_BUTTON });
  const titleInput: HTMLInputElement = screen.getByTestId(MOVIE_TITLE_INPUT);
  titleInput.value = '';
  await user.type(titleInput, TITLE_TEXT);
  // await user.click(resetButton);
  await user.click(submitButton);

  expect(handleSubmit).toBeCalledTimes(1);
  expect(handleSubmit).toBeCalledWith({
    ...TEST_MOVIE_INFO,
    title: TITLE_TEXT,
  });
});

it('returns the filled form with title change, reset click and submit click', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(<MovieForm movieInfo={TEST_MOVIE_INFO} onSubmit={handleSubmit} />);

  const submitButton = screen.getByRole('button', { name: SUBMIT_BUTTON });
  const resetButton = screen.getByRole('button', { name: RESET_BUTTON });
  const titleInput: HTMLInputElement = screen.getByTestId(MOVIE_TITLE_INPUT);
  titleInput.value = '';
  await user.type(titleInput, TITLE_TEXT);
  await user.click(resetButton);
  await user.click(submitButton);

  expect(handleSubmit).toBeCalledTimes(1);
  expect(handleSubmit).toBeCalledWith(TEST_MOVIE_INFO);
});
