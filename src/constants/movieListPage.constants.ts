import { Tuple } from '../utils';

export const MOVIE_GENRES: Tuple<string, 6> = [
  'All',
  'Drama',
  'Documentary',
  'Comedy',
  'Horror',
  'Crime',
];

export const SORT_OPTION_ENTRIES: Tuple<Tuple<string, 2>, 2> = [
  ['RELEASE DATE', 'release_date'],
  ['TITLE', 'title'],
];
export const SORT_OPTIONS: { [key: string]: string } =
  Object.fromEntries(SORT_OPTION_ENTRIES);
export const DEFAULT_SORT_OPTION_KEY: string = SORT_OPTION_ENTRIES[0][0];

export const QUERY_GENRE_FILTER_PARAM = 'filter';
export const QUERY_LIMIT_PARAM = 'limit';
export const QUERY_SORT_BY = 'sortBy';
export const QUERY_SEARCH = 'search';
export const QUERY_SEARCH_BY = 'searchBy';

export const DEFAULT_SEARCH_QUERY = '';
export const DEFAULT_QUERY_LIMIT = '6';
export const DEFAULT_SEARCH_BY_FIELD = 'title';

export const REQUEST_HOSTNAME: string = 'localhost';
export const REQUEST_PORT: number = 4000;
export const REQUEST_SCHEMA: string = 'http';
export const REQUEST_URI = `${REQUEST_SCHEMA}://${REQUEST_HOSTNAME}:${REQUEST_PORT}`;
