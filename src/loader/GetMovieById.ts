import { LoaderFunctionArgs } from 'react-router-dom';
import { REQUEST_URI } from '../constants/loader.constants';
import { ROOT_MOVIE_ID } from '../constants/router.constants';
import { MovieData } from '../components/MovieListPage';

export type GetMovieByIdResponse = null | MovieData;

export const getMovieById = async ({ params, request }: LoaderFunctionArgs) => {
  const movieId = params[ROOT_MOVIE_ID]?.substring(1); // Used to remove ':' at the start
  const newUrl = new URL(`${REQUEST_URI}/movies/${movieId}`);
  const response = await fetch(newUrl, {
    headers: { accept: 'application/json' },
    signal: request.signal,
  });
  if (response.status < 200 && 299 > response.status) {
    return null;
  }
  return (await response.json()) as MovieData;
};
