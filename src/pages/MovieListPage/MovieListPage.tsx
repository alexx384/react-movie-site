import React from 'react';
import styles from './MovieListPage.module.css';
import { SortControl } from '../../components/SortControl';
import { GenreSelect } from '../../components/GenreSelect';
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
  getSearchQueryFromUrlSearchParams,
  setSearchQueryToUrlSearchParams,
} from './MovieListPage.utils';
import { MovieListPageContext, MovieDataResponse } from './MovieListPage.types';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { GetMovieListResponse } from '../../loaders/GetMovieListLoader';

export const MovieListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const genreFilter = getGenreFilterFromUrlSearchParam(searchParams);
  const sortBy = getSortByFromUrlSearchParams(searchParams);
  const searchQuery = getSearchQueryFromUrlSearchParams(searchParams);
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
    navigate(`/${movieId}?${searchParams}`);
  };
  const handleOpenSearchForm = () => {
    navigate(`/?${searchParams}`);
  };
  const handleSendSearchQuery = (searchQuery: string) => {
    setSearchParams((prev) =>
      setSearchQueryToUrlSearchParams(prev, searchQuery)
    );
  };
  const outletContext: MovieListPageContext = {
    initialSearchQuery: searchQuery,
    onOpenSearchForm: handleOpenSearchForm,
    onSendSearchQuery: handleSendSearchQuery,
  };
  return (
    <>
      <Outlet context={outletContext} />
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
