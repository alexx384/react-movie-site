import {
  DEFAULT_MOVIE_GENRES,
  DEFAULT_MOVIE_GENRE_ID_MOVIE_GENRE_MAP,
} from '../constants/movieForm.constants';
import {
  CreateMovieRequest,
  MovieDataResponse,
  UpdateMovieRequest,
} from '../interfaces/movieData';
import {
  FullMovieInfo,
  MovieBasicInfo,
  RequiredFullMovieInfo,
} from '../interfaces/movieInfo';

export const mapMovieDataResponseToRequiredFullMovieInfo = (
  movieData: MovieDataResponse
): RequiredFullMovieInfo => {
  const movieGenreNames = new Set<string>(movieData.genres);
  const movieGenres = DEFAULT_MOVIE_GENRES.filter((movieGenre) =>
    movieGenreNames.has(movieGenre.value)
  ).reduce((set, movieGenre) => set.add(movieGenre.id), new Set<string>());
  return {
    id: movieData.id,
    movieURL: movieData.poster_path,
    title: movieData.title,
    releaseDate: new Date(movieData.release_date),
    genreIds: movieGenres,
    overview: movieData.overview,
    runtime: movieData.runtime,
    rating: movieData.vote_average,
  };
};

const mapMovieBasicInfoToReleseDate = (movieInfo: MovieBasicInfo): string => {
  return movieInfo.releaseDate.toISOString().slice(0, 10);
};

const mapMovieBasicInfoToGenres = (movieInfo: MovieBasicInfo): string[] => {
  return DEFAULT_MOVIE_GENRES.filter((movieGenre) =>
    movieInfo.genreIds.has(movieGenre.id)
  ).map((movieGenre) => movieGenre.value);
};

export const mapFullMovieInfoToCreateMovieResponse = (
  movieInfo: FullMovieInfo
): CreateMovieRequest => {
  return {
    poster_path: movieInfo.movieURL,
    title: movieInfo.title,
    release_date: mapMovieBasicInfoToReleseDate(movieInfo),
    genres: mapMovieBasicInfoToGenres(movieInfo),
    overview: movieInfo.overview,
    runtime: movieInfo.runtime,
    vote_average: movieInfo.rating,
    budget: 0,
    revenue: 0,
    tagline: movieInfo.title,
    vote_count: 0,
  };
};

export const mapFullMovieInfoToUpdateMovieResponse = (
  movieInfo: FullMovieInfo
): UpdateMovieRequest => {
  if (!movieInfo.id) {
    throw new Error('The movie info ID cannot be undefined');
  }
  return {
    id: movieInfo.id,
    ...mapFullMovieInfoToCreateMovieResponse(movieInfo),
  };
};

export const mapGenreIdsToGenreValues = (genreIds: Set<string>) => {
  return Array.from(genreIds).map((genreId) =>
    DEFAULT_MOVIE_GENRE_ID_MOVIE_GENRE_MAP.get(genreId)
  );
};
