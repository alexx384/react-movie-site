import React from 'react';
import styles from './MovieListPage.module.css';
import { SortControl } from '../SortControl';
import { GenreSelect } from '../GenreSelect';
import { MovieListResult } from './MovieListResult';
import { MovieListHeader } from './MovieListHeader';
import {
  DEFAULT_SEARCH_BY_FIELD,
  DEFAULT_SEARCH_QUERY,
  DEFAULT_SORT_OPTION_KEY,
  MOVIE_GENRES,
  QUERY_SEARCH,
  QUERY_SEARCH_BY,
  QUERY_SORT_BY,
  REQUEST_URI,
  SORT_OPTIONS,
} from '../../constants/movieListPage.constants';
import { QUERY_GENRE_FILTER_PARAM } from '../../constants/movieListPage.constants';
import {
  useMovieData,
  mapMovieDataToMovieDetailsInfo,
} from './MovieListPage.utils';
import {
  MovieDataResponse,
  MovieListFilterSettings,
} from './MovieListPage.types';

export const MovieListPage = () => {
  const [selectedMovieId, setSelectedMovieId] = React.useState('');
  const [genreFilter, setGenreFilter] = React.useState(MOVIE_GENRES[0]);
  const [sortBy, setSortBy] = React.useState(DEFAULT_SORT_OPTION_KEY);
  const [searchQuery, setSearchQuery] = React.useState(DEFAULT_SEARCH_QUERY);
  const queryFilter: MovieListFilterSettings = React.useMemo(
    () => ({
      [QUERY_GENRE_FILTER_PARAM]: genreFilter !== 'All' ? genreFilter : '',
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

  const [totalMovieNumber, movieDetailsArray] = React.useMemo(() => {
    const movieData: MovieDataResponse = movieDataNullableResponse ?? {
      totalAmount: 0,
      data: [],
    };
    const movieDetailsArray = movieData.data.map(
      mapMovieDataToMovieDetailsInfo
    );
    return [movieData.totalAmount, movieDetailsArray];
  }, [movieDataNullableResponse]);
  const selectedMovie = React.useMemo(
    () => movieDetailsArray.find((data) => data.id === selectedMovieId),
    [movieDetailsArray, selectedMovieId]
  );

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
        <div className={styles['search-settings']}>
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
          movieList={movieDetailsArray}
          totalMovieNumber={String(totalMovieNumber)}
          onMovieClick={setSelectedMovieId}
        />
      </div>
    </>
  );
};
