import React from 'react';
import styles from './MovieListPage.module.css';
import { SortControl } from '../SortControl';
import { GenreSelect } from '../GenreSelect';
import { MovieDetailsInfo } from '../MovieDetails';
import { MovieListResult } from './MovieListResult';
import { MovieListHeader } from './MovieListHeader';
import { Tuple } from '../../utils';
import { arrayToString } from '../../utils/string.utils';

type MovieData = {
  id: string;
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

type MovieDataResponse = {
  totalAmount: number;
  data: MovieData[];
};

const genres: Tuple<string, 6> = [
  'Drama',
  'All',
  'Documentary',
  'Comedy',
  'Horror',
  'Crime',
];

const sortOptions: Tuple<string, 2> = ['release_date', 'title'];

const useMovieData = <R,>(
  url: string,
  limit: string,
  sortBy: string,
  search: string,
  searchBy: string,
  filter: string
): R | null => {
  const [data, setData] = React.useState<R | null>(null);
  React.useEffect(() => {
    if (!url) {
      return () => {};
    }
    const urlData = new URL(url);
    urlData.searchParams.append('limit', limit);
    urlData.searchParams.append('sortBy', sortBy);
    urlData.searchParams.append('search', search);
    urlData.searchParams.append('searchBy', searchBy);
    urlData.searchParams.append('filter', filter);
    let ignore = false;
    fetch(urlData, {
      headers: { accept: 'application/json' },
    })
      .then((response) => response.json())
      .then((json) => {
        if (!ignore) {
          setData(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [url, limit, sortBy, search, searchBy, filter]);
  return data;
};

const mapMovieDataToMovieDetailsInfo = (
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

export const MovieListPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('you');
  const [selectedGenre, setSelectedGenre] = React.useState(genres[0]);
  const [sortOption, setSortOption] = React.useState(sortOptions[0]);
  const [selectedMovieId, setSelectedMovieId] = React.useState('');
  const movieDataNullableResponse = useMovieData<MovieDataResponse>(
    'http://localhost:4000/movies',
    '6',
    sortOption,
    searchQuery,
    'title',
    selectedGenre
  );
  const movieData: MovieDataResponse = movieDataNullableResponse ?? {
    totalAmount: 0,
    data: [],
  };
  const movieDetailsMap = movieData.data
    .map(mapMovieDataToMovieDetailsInfo)
    .reduce((map, current) => map.set(current.id, current), new Map());
  const handleShowSearchForm = () => {
    setSelectedMovieId('');
  };
  const selectedMovie = movieDetailsMap.get(selectedMovieId);
  return (
    <>
      <MovieListHeader
        searchQuery={searchQuery}
        movieDetails={selectedMovie}
        onSearch={setSearchQuery}
        onShowSearchForm={handleShowSearchForm}
      />
      <div className={styles['header-body-separator']}></div>
      <div className={styles.body}>
        <div className={styles['body-settings']}>
          <GenreSelect
            listOfGenres={[...genres]}
            initiallySelectedGenreName={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
          <SortControl
            options={[...sortOptions]}
            selectedOption={sortOption}
            onSelect={setSortOption}
          />
        </div>
        <MovieListResult
          movieList={[...movieDetailsMap.values()]}
          totalMovieNumber={String(movieData.totalAmount)}
          onMovieClick={setSelectedMovieId}
        />
      </div>
    </>
  );
};
