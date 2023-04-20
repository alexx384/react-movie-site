import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.module.css';
import { MovieListPage } from './components/MovieListPage';
import { MovieDetailsHeader } from './components/MovieListPage/MovieDetailsHeader';
import { SearchFormHeader } from './components/MovieListPage/SearchFormHeader';
import { ROOT_MOVIE_ID } from './constants/router.constants';
import { getMovieById } from './loader/GetMovieById';
import { getMovieList } from './loader/GetMovieList';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MovieListPage />} loader={getMovieList}>
      <Route index element={<SearchFormHeader />} />
      <Route
        path={`:${ROOT_MOVIE_ID}`}
        element={<MovieDetailsHeader />}
        loader={getMovieById}
      />
    </Route>
  )
);

export const App = () => {
  return <RouterProvider router={router} />;
};
