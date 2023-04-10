import { render, screen } from '@testing-library/react';
import { EditMovieDialog } from '.';
import { EDIT_MOVIE_TITLE } from '../../constants/movieDialog.constants';
import { TEST_MOVIE_INFO } from '../../constants/movieForm.constants';

it('renders title', () => {
  render(<EditMovieDialog movieInfo={TEST_MOVIE_INFO} isOpened={true} />);

  const titleElement = screen.queryByRole('heading', {
    name: EDIT_MOVIE_TITLE,
  });

  expect(titleElement).toBeInTheDocument();
});
