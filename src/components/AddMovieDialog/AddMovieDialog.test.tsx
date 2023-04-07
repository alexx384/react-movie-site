import { render, screen } from '@testing-library/react';
import { AddMovieDialog } from '.';
import { ADD_MOVIE_TITLE } from '../../constants/movieDialog.constants';

it('renders title', () => {
  render(<AddMovieDialog isOpened={true} />);

  const titleElement = screen.queryByRole('heading', { name: ADD_MOVIE_TITLE });

  expect(titleElement).toBeInTheDocument();
});
