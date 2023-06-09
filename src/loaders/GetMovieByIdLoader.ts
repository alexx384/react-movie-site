import { LoaderFunctionArgs } from 'react-router-dom';
import { REQUEST_URI } from '../constants/request.constants';
import { ROOT_MOVIE_ID } from '../constants/router.constants';
import { MovieData, MovieDataResponse } from '../interfaces/movieData';

export type GetMovieByIdResponse = MovieDataResponse;

export const getMovieByIdLoader = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  const movieId = params[ROOT_MOVIE_ID];
  const newUrl = new URL(`${REQUEST_URI}/movies/${movieId}`);
  const response = await fetch(newUrl, {
    headers: { accept: 'application/json' },
    signal: request.signal,
  });
  if (!response.ok) {
    throw new Response('Something went wrong', { status: response.status });
  }
  return (await response.json()) as MovieData;
};
