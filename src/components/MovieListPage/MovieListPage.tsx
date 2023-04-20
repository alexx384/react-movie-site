import React from 'react';
import styles from './MovieListPage.module.css';
import { SortControl } from '../SortControl';
import { GenreSelect } from '../GenreSelect';
import { MovieListResult } from './MovieListResult';
import {
  MOVIE_GENRES,
  SORT_OPTIONS,
} from '../../constants/movieListPage.constants';
import {
  mapMovieDataToMovieDetailsInfo,
  getGenreFilterFromUrlSearchParam,
  getSortByFromUrlSearchParams,
  setGenreFilterToUrlSearchParams,
  setSortByToUrlSearchParams,
} from './MovieListPage.utils';
import { MovieDataResponse } from './MovieListPage.types';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { GetMovieListResponse } from '../../loader/GetMovieList';

export const MovieListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const genreFilter = getGenreFilterFromUrlSearchParam(searchParams);
  const sortBy = getSortByFromUrlSearchParams(searchParams);
  const movieDataNullableResponse = useLoaderData() as GetMovieListResponse;
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
  const navigate = useNavigate();

  const handleSelectSortOption = (sortByOption: string) => {
    setSearchParams((prev) => setSortByToUrlSearchParams(prev, sortByOption));
  };
  const handleGenreFilter = (genreFilter: string) => {
    setSearchParams((prev) =>
      setGenreFilterToUrlSearchParams(prev, genreFilter)
    );
  };
  const handleMovieListResultClick = (movieId: string) => {
    navigate(`/:${movieId}?${searchParams}`);
  };
  return (
    <>
      <Outlet />
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
            onMovieClick={handleMovieListResultClick}
          />
        </div>
      </div>
    </>
  );
};
