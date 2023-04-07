import { render, screen } from '@testing-library/react';
import { DeleteMovieDialog } from '.';
import {
  DELETE_MOVIE_TITLE,
  DELETE_MOVIE_QUESTION,
  DELETE_MOVIE_BUTTON,
} from '../../constants/movieDialog.constants';
import userEvent from '@testing-library/user-event';

it('renders title, question', () => {
  render(<DeleteMovieDialog isOpened={true} />);

  const titleElement = screen.queryByRole('heading', {
    name: DELETE_MOVIE_TITLE,
  });
  const questionElement = screen.queryByText(DELETE_MOVIE_QUESTION);

  expect(titleElement).toBeInTheDocument();
  expect(questionElement).toBeInTheDocument();
});

it('invokes submit on confirm button click', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();
  render(<DeleteMovieDialog isOpened={true} onSubmit={handleSubmit} />);

  const buttonElement = screen.getByRole('button', {
    name: DELETE_MOVIE_BUTTON,
  });
  await user.click(buttonElement);

  expect(handleSubmit).toBeCalledTimes(1);
});
