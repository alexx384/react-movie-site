import React from 'react';
import styles from './MovieListPage.module.css';
import { SortControl } from '../SortControl';
import { GenreSelect } from '../GenreSelect';
import { MovieListResult } from './MovieListResult';
import { MovieListHeader } from './MovieListHeader';
import {
  MOVIE_GENRES,
  REQUEST_URI,
  SORT_OPTIONS,
} from '../../constants/movieListPage.constants';
import {
  useMovieData,
  mapMovieDataToMovieDetailsInfo,
  getDefaultSearchParams,
  getGenreFilterFromUrlSearchParam,
  getSortByFromUrlSearchParams,
  getSearchQueryFromUrlSearchParams,
  useMovieRequestParams,
  setGenreFilterToUrlSearchParams,
  setSearchQueryToUrlSearchParams,
  setSortByToUrlSearchParams,
} from './MovieListPage.utils';
import {
  MovieDataResponse,
  MovieListFilterSettings,
} from './MovieListPage.types';
import { Outlet, useSearchParams } from 'react-router-dom';

export const MovieListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    getDefaultSearchParams()
  );
  const genreFilter = getGenreFilterFromUrlSearchParam(searchParams);
  const sortBy = getSortByFromUrlSearchParams(searchParams);
  const searchQuery = getSearchQueryFromUrlSearchParams(searchParams);

  const [selectedMovieId, setSelectedMovieId] = React.useState('');
  const queryFilter: MovieListFilterSettings =
    useMovieRequestParams(searchParams);
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

  const handleSelectSortOption = (sortByOption: string) => {
    setSearchParams((prev) => setSortByToUrlSearchParams(prev, sortByOption));
  };
  const handleSearchMovie = (movieQuery: string) => {
    setSearchParams((prev) =>
      setSearchQueryToUrlSearchParams(prev, movieQuery)
    );
  };
  const handleGenreFilter = (genreFilter: string) => {
    setSearchParams((prev) =>
      setGenreFilterToUrlSearchParams(prev, genreFilter)
    );
  };
  const handleShowSearchForm = () => {
    setSelectedMovieId('');
  };
  return (
    <>
      <MovieListHeader
        searchQuery={searchQuery}
        movieDetails={selectedMovie}
        onSearch={handleSearchMovie}
        onShowSearchForm={handleShowSearchForm}
      />
      <div className={styles['header-body-separator']}></div>
      <div className={styles.body}>
        <div className={styles['search-settings']}>
          <GenreSelect
            listOfGenres={[...MOVIE_GENRES]}
            initiallySelectedGenreName={genreFilter}
            onSelectGenre={handleGenreFilter}
          />
          <SortControl
            options={Object.keys(SORT_OPTIONS)}
            selectedOption={sortBy}
            onSelect={handleSelectSortOption}
            key={sortBy}
          />
        </div>
        <div className={styles['movie-list-result']}>
          <MovieListResult
            movieList={movieDetailsArray}
            totalMovieNumber={String(totalMovieNumber)}
            onMovieClick={setSelectedMovieId}
          />
        </div>
      </div>
    </>
  );
};
