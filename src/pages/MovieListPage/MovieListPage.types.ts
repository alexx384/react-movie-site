import {
  QUERY_GENRE_FILTER_PARAM,
  QUERY_SEARCH,
  QUERY_SEARCH_BY,
  QUERY_SORT_BY,
} from '../../constants/movieListPage.constants';

export type MovieData = {
  id: number;
  title: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  poster_path: string;
  overview: string;
  budget: number;
  revenue: number;
  genres: string[];
  runtime: number;
};

export type MovieDataResponse = {
  totalAmount: number;
  data: MovieData[];
};

export type MovieListFilterSettings = {
  [QUERY_GENRE_FILTER_PARAM]: string;
  [QUERY_SORT_BY]: string;
  [QUERY_SEARCH]: string;
  [QUERY_SEARCH_BY]: string;
};

export interface SearchFormContext {
  initialSearchQuery: string;
  onSendSearchQuery: (searchQUery: string) => void;
}

export interface MovieDetailsContext {
  onOpenSearchForm: () => void;
}

export interface MovieListPageContext
  extends SearchFormContext,
    MovieDetailsContext {}
