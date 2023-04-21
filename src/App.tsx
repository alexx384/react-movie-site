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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MovieListPage />} loader={getMovieListLoader}>
      <Route index element={<SearchFormHeader />} />
      <Route
        path={`:${ROOT_MOVIE_ID}`}
        element={<MovieDetailsHeader />}
        loader={getMovieByIdLoader}
      />
    </Route>
  )
);

export const App = () => {
  return <RouterProvider router={router} />;
};
