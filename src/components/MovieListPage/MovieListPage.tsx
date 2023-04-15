import React from 'react';
import styles from './MovieListPage.module.css';
import { SortControl } from '../SortControl';
import { GenreSelect } from '../GenreSelect';
import { MovieDetailsInfo } from '../MovieDetails';
import { MovieListResult } from './MovieListResult';
import { MovieListHeader } from './MovieListHeader';
import { arrayToString } from '../../utils/string.utils';
import { customFetch } from '../../utils/request.utils';
import {
  DEFAULT_QUERY_LIMIT,
  DEFAULT_SEARCH_BY_FIELD,
  DEFAULT_SEARCH_QUERY,
  MOVIE_GENRES,
  QUERY_LIMIT_PARAM,
  QUERY_SEARCH,
  QUERY_SEARCH_BY,
  QUERY_SORT_BY,
  REQUEST_URI,
  SORT_OPTIONS,
} from '../../constants/movieListPage.constants';
import { QUERY_GENRE_FILTER_PARAM } from '../../constants/movieListPage.constants';

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

const useMovieData = <R,>(
  url: string,
  queryParams: { [key: string]: string }
): R | null => {
  const [data, setData] = React.useState<R | null>(null);
  React.useEffect(() => {
    const startFetching = async (urlData: URL, key: string) => {
      try {
        const response = await customFetch(urlData, {
          headers: { accept: 'application/json' },
          signalKey: key,
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
    startFetching(urlData, url);
    return () => {};
  }, [url, queryParams]);
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
  const [selectedMovieId, setSelectedMovieId] = React.useState('');
  const [genreFilter, setGenreFilter] = React.useState(MOVIE_GENRES[0]);
  const [sortBy, setSortBy] = React.useState(
    Object.keys(SORT_OPTIONS)[0] ?? ''
  );
  const [searchQuery, setSearchQuery] = React.useState(DEFAULT_SEARCH_QUERY);
  const queryFilter = React.useMemo(
    () => ({
      [QUERY_GENRE_FILTER_PARAM]: genreFilter !== 'All' ? genreFilter : '',
      [QUERY_LIMIT_PARAM]: DEFAULT_QUERY_LIMIT,
      [QUERY_SORT_BY]: SORT_OPTIONS[sortBy] ?? '',
      [QUERY_SEARCH]: searchQuery,
      [QUERY_SEARCH_BY]: DEFAULT_SEARCH_BY_FIELD,
    }),
    [genreFilter, sortBy, searchQuery]
  );
  const movieDataNullableResponse = useMovieData<MovieDataResponse>(
    `${REQUEST_URI}/movies`,
    queryFilter
  );

  const movieData: MovieDataResponse = movieDataNullableResponse ?? {
    totalAmount: 0,
    data: [],
  };
  const movieDetailsMap = movieData.data
    .map(mapMovieDataToMovieDetailsInfo)
    .reduce((map, current) => map.set(current.id, current), new Map());
  const selectedMovie = movieDetailsMap.get(selectedMovieId);

  const handleShowSearchForm = () => {
    setSelectedMovieId('');
  };
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
            listOfGenres={[...MOVIE_GENRES]}
            initiallySelectedGenreName={genreFilter}
            onSelectGenre={setGenreFilter}
          />
          <SortControl
            options={Object.keys(SORT_OPTIONS)}
            selectedOption={sortBy}
            onSelect={setSortBy}
            key={sortBy}
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
