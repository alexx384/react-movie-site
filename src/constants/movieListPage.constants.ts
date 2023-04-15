import { Tuple } from '../utils';

export const MOVIE_GENRES: Tuple<string, 6> = [
  'All',
  'Drama',
  'Documentary',
  'Comedy',
  'Horror',
  'Crime',
];

// export const SORT_OPTIONS = {
//   release_date: 'RELEASE DATE',
//   title: 'TITLE',
// };

export const SORT_OPTIONS: { [key: string]: string } = {
  'RELEASE DATE': 'release_date',
  TITLE: 'title',
};

export const QUERY_GENRE_FILTER_PARAM = 'filter';
export const QUERY_LIMIT_PARAM = 'limit';
export const QUERY_SORT_BY = 'sortBy';
export const QUERY_SEARCH = 'search';
export const QUERY_SEARCH_BY = 'searchBy';

export const DEFAULT_SEARCH_QUERY = '';
export const DEFAULT_QUERY_LIMIT = '6';
export const DEFAULT_SEARCH_BY_FIELD = 'title';

export const REQUEST_URI = 'http://localhost:4000';
