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
  getGenreFilterFromUrlSearchParam,
  getSortByFromUrlSearchParams,
  setGenreFilterToUrlSearchParams,
  setSortByToUrlSearchParams,
  getSearchQueryFromUrlSearchParams,
  setSearchQueryToUrlSearchParams,
} from './MovieListPage.utils';
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { GetMovieListResponse } from '../../loaders/GetMovieListLoader';
import { SearchFormContext } from './SearchFormHeader';
import { MovieDetailsContext } from './MovieDetailsHeader';
import { mapMovieDataResponseToRequiredFullMovieInfo } from '../../utils/mapper.utils';

export interface MovieListPageContext
  extends SearchFormContext,
    MovieDetailsContext {}

export const MovieListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const genreFilter = getGenreFilterFromUrlSearchParam(searchParams);
  const sortBy = getSortByFromUrlSearchParams(searchParams);
  const searchQuery = getSearchQueryFromUrlSearchParams(searchParams);
  const movieDataNullableResponse = useLoaderData() as GetMovieListResponse;
  const [totalMovieNumber, movieDetailsArray] = React.useMemo(() => {
    const movieData = movieDataNullableResponse ?? {
      totalAmount: 0,
      data: [],
    };
    const movieDetailsArray = movieData.data.map(
      mapMovieDataResponseToRequiredFullMovieInfo
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
  const handleDisplayMovieDetails = (movieId: number) => {
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
  const handleAddMovieClick = () => {
    navigate(`/new?${searchParams}`);
  };
  const outletContext: MovieListPageContext = {
    initialSearchQuery: searchQuery,
    onOpenSearchForm: handleOpenSearchForm,
    onSendSearchQuery: handleSendSearchQuery,
    onAddMovie: handleDisplayMovieDetails,
    onEditMovie: handleDisplayMovieDetails,
    onCloseEditMovie: handleDisplayMovieDetails,
    onCloseAddMovie: handleOpenSearchForm,
    onAddMovieClick: handleAddMovieClick,
  };
  const handleMovieEdit = (movieId: number) => {
    navigate(`/${movieId}/edit?${searchParams}`);
  };
  return (
    <>
      <Outlet context={outletContext} />
      <div className={styles['header-body-separator']}></div>
      <div className={styles.body}>
        <div className={styles['search-settings']}>
          <GenreSelect
            listOfGenres={MOVIE_GENRES}
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
            onMovieClick={handleDisplayMovieDetails}
            onMovieEdit={handleMovieEdit}
          />
        </div>
      </div>
    </>
  );
};
