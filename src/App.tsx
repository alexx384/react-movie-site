import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.module.css';
import { MovieListPage } from './pages/MovieListPage';
import { MovieDetailsHeader } from './pages/MovieListPage/MovieDetailsHeader';
import { SearchFormHeader } from './pages/MovieListPage/SearchFormHeader';
import { ROOT_MOVIE_ID } from './constants/router.constants';
import { getMovieByIdLoader } from './loaders/GetMovieByIdLoader';
import { getMovieListLoader } from './loaders/GetMovieListLoader';
import { MovieDetailsHeaderError } from './pages/MovieListPage/MovieDetailsHeader/MovieDetailsHeaderError';
import { MovieListPageError } from './pages/MovieListPage/MovieListPageError';
import { doNotRevalidateWhenHrefsAreTheSame } from './utils';
import { AddMovieDialog } from './components/AddMovieDialog';
import { EditMovieDialog } from './components/EditMovieDialog';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<MovieListPage />}
      loader={getMovieListLoader}
      errorElement={<MovieListPageError />}
      shouldRevalidate={doNotRevalidateWhenHrefsAreTheSame}
    >
      <Route path="/" element={<SearchFormHeader />}>
        <Route path="new" element={<AddMovieDialog />} />
        <Route
          path={`:${ROOT_MOVIE_ID}/edit`}
          loader={getMovieByIdLoader}
          element={<EditMovieDialog />}
        />
      </Route>
      <Route
        path={`:${ROOT_MOVIE_ID}`}
        element={<MovieDetailsHeader />}
        loader={getMovieByIdLoader}
        errorElement={<MovieDetailsHeaderError />}
        shouldRevalidate={doNotRevalidateWhenHrefsAreTheSame}
      />
    </Route>
  )
);

export const App = () => {
  return <RouterProvider router={router} />;
};
