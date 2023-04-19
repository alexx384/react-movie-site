import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.module.css';
import {
  loader,
  MovieDetailsRoute,
  MOVIE_ID,
  RootRoute,
  SearchFormRoute,
} from './routes/root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    loader: loader,
    children: [
      {
        index: true,
        element: <SearchFormRoute />,
      },
      {
        path: `:${MOVIE_ID}`,
        element: <MovieDetailsRoute />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
