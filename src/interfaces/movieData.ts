export interface MovieDataId {
  id: number;
}

export interface MovieData {
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
}

export interface MovieDataResponse extends MovieDataId, MovieData {}

export interface MovieListDataResponse {
  totalAmount: number;
  data: MovieDataResponse[];
}

export interface CreateMovieRequest extends MovieData {}

export interface UpdateMovieRequest extends MovieDataId, MovieData {}
