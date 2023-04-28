import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import { EditMovieContext, EditMovieDialog } from '.';
import { EDIT_MOVIE_TITLE } from '../../constants/movieDialog.constants';
import { TEST_MOVIE_DATA } from '../../constants/movieForm.constants';
import { ROOT_MOVIE_ID } from '../../constants/router.constants';

const Root = ({ outletContext }: { outletContext: EditMovieContext }) => (
  <Outlet context={outletContext} />
);

it('renders title', async () => {
  const outletContext: EditMovieContext = {
    onCloseEditMovie: jest.fn(),
    onEditMovie: jest.fn(),
  };

  let router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Root outletContext={outletContext} />,
        children: [
          {
            path: `:${ROOT_MOVIE_ID}/edit`,
            element: <EditMovieDialog />,
            loader: () => TEST_MOVIE_DATA,
          },
        ],
      },
    ],
    { initialEntries: ['/10191/edit'] }
  );
  render(<RouterProvider router={router} />);

  await waitFor(() => {
    screen.queryByRole('heading', {
      name: EDIT_MOVIE_TITLE,
    });
  });
  const titleElement = screen.queryByRole('heading', {
    name: EDIT_MOVIE_TITLE,
  });
  expect(titleElement).toBeInTheDocument();
});
