import { GenreOption } from '../components/Multiselect';
import { MovieDataResponse } from '../../interfaces/movieData';
import { RequiredFullMovieInfo } from '../../interfaces/movieInfo';

export const MOVIE_URL = 'MOVIE URL';
export const RATING = 'RATING';
export const GENRE = 'GENRE';
export const RUNTIME = 'RUNTIME';
export const OVERVIEW = 'OVERVIEW';
export const SUBMIT_BUTTON = 'SUBMIT';
export const RESET_BUTTON = 'RESET';

export const TEST_MOVIE_DATA: MovieDataResponse = {
  id: 1,
  title: 'Moana',
  release_date: '2016-11-14',
  poster_path: 'https://www.moana.com',
  vote_average: 7.6,
  genres: ['Comedy'],
  runtime: 107,
  overview:
    "Moana Waialiki is a sea voyaging enthusiast and the only daughter of a chief in a long line of navigators. When her island's fishermen can't catch any fish and the crops fail, she learns that the demigod Maui caused the blight by stealing the heart of the goddess, Te Fiti. The only way to heal the island is to persuade Maui to return Te Fiti's heart, so Moana sets off on an epic journey across the Pacific. The film is based on stories from Polynesian mythology.",
  budget: 0,
  revenue: 0,
  tagline: 'Moana',
  vote_count: 0,
};

export const TEST_MOVIE_INFO: RequiredFullMovieInfo = {
  id: 1,
  title: 'Moana',
  releaseDate: new Date('2016-11-14T00:00:00.000Z'),
  movieURL: 'https://www.moana.com',
  rating: 7.6,
  genreIds: new Set(['comedy']),
  runtime: 107,
  overview:
    "Moana Waialiki is a sea voyaging enthusiast and the only daughter of a chief in a long line of navigators. When her island's fishermen can't catch any fish and the crops fail, she learns that the demigod Maui caused the blight by stealing the heart of the goddess, Te Fiti. The only way to heal the island is to persuade Maui to return Te Fiti's heart, so Moana sets off on an epic journey across the Pacific. The film is based on stories from Polynesian mythology.",
};

export const DEFAULT_MOVIE_GENRES: GenreOption[] = [
  { id: 'crime', value: 'Crime' },
  { id: 'documentary', value: 'Documentary' },
  { id: 'horror', value: 'Horror' },
  { id: 'comedy', value: 'Comedy' },
  { id: 'drama', value: 'Drama' },
  { id: 'fantasy', value: 'Fantasy' },
  { id: 'action', value: 'Action' },
  { id: 'romance', value: 'Romance' },
  { id: 'adventure', value: 'Adventure' },
  { id: 'science fiction', value: 'Science Fiction' },
  { id: 'animation', value: 'Animation' },
  { id: 'family', value: 'Family' },
];

export const DEFAULT_MOVIE_GENRE_ID_MOVIE_GENRE_MAP =
  DEFAULT_MOVIE_GENRES.reduce(
    (map, movieGenre) => map.set(movieGenre.id, movieGenre.value),
    new Map()
  );
