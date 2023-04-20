import { Tuple } from '../utils';

export const MOVIE_GENRES: Tuple<string, 6> = [
  'All',
  'Drama',
  'Documentary',
  'Comedy',
  'Horror',
  'Crime',
];
export const DEFAULT_MOVIE_GENRE: string = MOVIE_GENRES[0];

export const SORT_OPTION_ENTRIES: Tuple<Tuple<string, 2>, 2> = [
  ['RELEASE DATE', 'release_date'],
  ['TITLE', 'title'],
];
export const SORT_OPTIONS: { [key: string]: string } =
  Object.fromEntries(SORT_OPTION_ENTRIES);
export const DEFAULT_SORT_OPTION_KEY: string = SORT_OPTION_ENTRIES[0][0];

export const QUERY_GENRE_FILTER_PARAM = 'filter';
export const QUERY_SORT_BY = 'sortBy';
export const QUERY_SEARCH = 'search';
export const QUERY_SEARCH_BY = 'searchBy';

export const DEFAULT_SEARCH_QUERY = '';
export const DEFAULT_SEARCH_BY_FIELD = 'title';
