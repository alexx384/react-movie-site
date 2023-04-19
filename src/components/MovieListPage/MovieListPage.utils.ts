import React from 'react';
import { arrayToString } from '../../utils/string.utils';
import { MovieData, MovieListFilterSettings, MovieListSearchParams } from '.';
import { MovieDetailsInfo } from '../MovieDetails';
import {
  DEFAULT_MOVIE_GENRE,
  DEFAULT_SEARCH_BY_FIELD,
  DEFAULT_SEARCH_QUERY,
  DEFAULT_SORT_OPTION_KEY,
  MOVIE_GENRES,
  QUERY_GENRE_FILTER_PARAM,
  QUERY_SEARCH,
  QUERY_SEARCH_BY,
  QUERY_SORT_BY,
  SORT_OPTIONS,
} from '../../constants/movieListPage.constants';
import { URLSearchParamsInit } from 'react-router-dom';

export const useMovieData = <R>(
  url: string,
  queryParams: MovieListFilterSettings
): R | null => {
  const [data, setData] = React.useState<R | null>(null);
  React.useEffect(() => {
    const abortController = new AbortController();
    const startFetching = async (urlData: URL, abortSignal: AbortSignal) => {
      try {
        const response = await fetch(urlData, {
          headers: { accept: 'application/json' },
          signal: abortSignal,
        });
        if (response.status < 200 && 299 > response.status) {
          return;
        }
        const data = await response.json();
        setData(data);
      } catch (error) {}
    };

    const urlData = new URL(url);
    Object.entries(queryParams).forEach((entry) =>
      urlData.searchParams.append(entry[0], entry[1])
    );
    startFetching(urlData, abortController.signal);
    return () => {
      abortController.abort(
        `Aborted request: ${url}, reason: component rerender`
      );
    };
  }, [url, queryParams]);
  return data;
};

export const mapMovieDataToMovieDetailsInfo = (
  movieData: MovieData
): MovieDetailsInfo => ({
  id: movieData.id,
  imageUrl: movieData.poster_path,
  movieName: movieData.title,
  releaseYear: new Date(movieData.release_date).getFullYear(),
  genre: arrayToString(movieData.genres),
  description: movieData.overview,
  durationInMinutes: movieData.runtime,
  rating: movieData.vote_average,
});

export const getDefaultSearchParams = (): MovieListSearchParams => {
  return {
    [QUERY_GENRE_FILTER_PARAM]: DEFAULT_MOVIE_GENRE,
    [QUERY_SORT_BY]: DEFAULT_SORT_OPTION_KEY,
    [QUERY_SEARCH]: DEFAULT_SEARCH_QUERY,
  };
};

export const useMovieRequestParams = (
  searchParams: URLSearchParams
): MovieListFilterSettings => {
  return React.useMemo(() => {
    const filter = getGenreFilterFromUrlSearchParam(searchParams);
    const sortByOptionText = getSortByFromUrlSearchParams(searchParams);
    const searchQuery = getSearchQueryFromUrlSearchParams(searchParams);
    return {
      [QUERY_GENRE_FILTER_PARAM]: filter !== 'All' ? filter : '',
      [QUERY_SORT_BY]: SORT_OPTIONS[sortByOptionText] ?? '',
      [QUERY_SEARCH]: searchQuery,
      [QUERY_SEARCH_BY]: DEFAULT_SEARCH_BY_FIELD,
    };
  }, [searchParams]);
};

export const getGenreFilterFromUrlSearchParam = (
  params: URLSearchParams
): string => {
  const genreFilterParam = params.get(QUERY_GENRE_FILTER_PARAM);
  return genreFilterParam ?? DEFAULT_MOVIE_GENRE;
};

export const getSortByFromUrlSearchParams = (
  params: URLSearchParams
): string => {
  const sortByParam = params.get(QUERY_SORT_BY);
  return sortByParam ?? DEFAULT_SORT_OPTION_KEY;
};

export const getSearchQueryFromUrlSearchParams = (
  params: URLSearchParams
): string => {
  const searchQuery = params.get(QUERY_SEARCH);
  return searchQuery ?? DEFAULT_SEARCH_QUERY;
};

export const setGenreFilterToUrlSearchParams = (
  urlSearchParams: URLSearchParams,
  genreFilter: string
): URLSearchParamsInit => ({
  ...Object.fromEntries(urlSearchParams.entries()),
  [QUERY_GENRE_FILTER_PARAM]: genreFilter,
});

export const setSortByToUrlSearchParams = (
  urlSearchParams: URLSearchParams,
  sortByOption: string
): URLSearchParamsInit => ({
  ...Object.fromEntries(urlSearchParams.entries()),
  [QUERY_SORT_BY]: sortByOption,
});

export const setSearchQueryToUrlSearchParams = (
  urlSearchParams: URLSearchParams,
  movieQuery: string
): URLSearchParamsInit => ({
  ...Object.fromEntries(urlSearchParams.entries()),
  [QUERY_SEARCH]: movieQuery,
});
