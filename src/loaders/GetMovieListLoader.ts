import { LoaderFunctionArgs } from 'react-router-dom';
import { mapSearchQueryParamsToMoviesRequestParams } from '../pages/MovieListPage/MovieListPage.utils';
import { REQUEST_URI } from '../constants/request.constants';
import {
  MovieDataResponse,
  MovieListDataResponse,
} from '../interfaces/movieData';

export type GetMovieListResponse = null | MovieListDataResponse;

export const getMovieListLoader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const queryParams = mapSearchQueryParamsToMoviesRequestParams(searchParams);
  const newUrl = new URL(`${REQUEST_URI}/movies`);
  Object.entries(queryParams).forEach((entry) =>
    newUrl.searchParams.append(entry[0], entry[1])
  );
  const response = await fetch(newUrl, {
    headers: { accept: 'application/json' },
    signal: request.signal,
  });
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as MovieDataResponse;
};
