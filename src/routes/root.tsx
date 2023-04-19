import { useLoaderData } from 'react-router-dom';
import { MovieListPage } from '../components/MovieListPage';
import { SearchForm } from '../components/SearchForm';

export const MOVIE_ID = 'movieId';
export const loader = async () => {};

export const RootRoute = () => {
  const {} = useLoaderData();
  console.log('Rendering root element');
  return <MovieListPage />;
};

export const SearchFormRoute = () => {
  return <SearchForm />;
};

export const MovieDetailsRoute = () => {
  const {} = useLoaderData();
  return <h1>Hello</h1>;
};
