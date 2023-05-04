import { LoaderFunction } from '@remix-run/node';
import { MovieDataResponse } from '~/interfaces/movieData';
import { REQUEST_URI } from '~/constants/request.constants';
import { ROOT_MOVIE_ID } from '~/constants/router.constants';
import {
  Outlet,
  useLoaderData,
  useOutletContext,
  useRouteError,
} from '@remix-run/react';
import {
  MovieIdCallbackContext,
  MovieIdContext,
} from '~/interfaces/outletContext';
import { MovieDetailsHeaderError } from '~/components/MovieDetailsHeader/MovieDetailsHeaderError';

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<MovieDataResponse> => {
  const movieId = params[ROOT_MOVIE_ID];
  const newUrl = new URL(`${REQUEST_URI}/movies/${movieId}`);
  const response = await fetch(newUrl, {
    headers: { accept: 'application/json' },
    signal: request.signal,
  });
  if (!response.ok) {
    throw new Response('Something went wrong', { status: response.status });
  }
  return (await response.json()) as MovieDataResponse;
};

export default function ProcessMovieId() {
  const movieData = useLoaderData<MovieDataResponse>();
  const contextProps = useOutletContext<MovieIdCallbackContext>();
  const context: MovieIdContext = {
    movieData: movieData,
    ...contextProps,
  };
  return <Outlet context={context} />;
}

export const ErrorBoundary = () => {
  const contextProps = useOutletContext<MovieIdCallbackContext>();
  const error = useRouteError();
  console.log(error);
  return <MovieDetailsHeaderError {...contextProps} error={error} />;
};
