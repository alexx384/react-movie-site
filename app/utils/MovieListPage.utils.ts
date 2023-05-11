import {
  DEFAULT_MOVIE_GENRE,
  DEFAULT_SEARCH_BY_FIELD,
  DEFAULT_SEARCH_QUERY,
  DEFAULT_SORT_OPTION_KEY,
  QUERY_GENRE_FILTER_PARAM,
  QUERY_SEARCH,
  QUERY_SEARCH_BY,
  QUERY_SORT_BY,
  SORT_OPTIONS,
} from '~/constants/movieListPage.constants';
import { URLSearchParamsInit } from 'react-router-dom';

export type MovieListFilterSettings = {
  [QUERY_GENRE_FILTER_PARAM]: string;
  [QUERY_SORT_BY]: string;
  [QUERY_SEARCH]: string;
  [QUERY_SEARCH_BY]: string;
};

export const mapSearchQueryParamsToMoviesRequestParams = (
  searchParams: URLSearchParams
): MovieListFilterSettings => {
  const filter = getGenreFilterFromUrlSearchParam(searchParams);
  const sortByOptionText = getSortByFromUrlSearchParams(searchParams);
  const searchQuery = getSearchQueryFromUrlSearchParams(searchParams);
  return {
    [QUERY_GENRE_FILTER_PARAM]: filter !== 'All' ? filter : '',
    [QUERY_SORT_BY]: SORT_OPTIONS[sortByOptionText] ?? '',
    [QUERY_SEARCH]: searchQuery,
    [QUERY_SEARCH_BY]: DEFAULT_SEARCH_BY_FIELD,
  };
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
