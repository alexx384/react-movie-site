import {
  Links,
  Outlet,
  useSearchParams,
  useRevalidator,
  useLoaderData,
  useNavigate,
  Meta,
  Scripts,
  useRouteError,
} from '@remix-run/react';
import { GenreSelect } from './components/GenreSelect';
import { SortControl } from './components/SortControl';
import { MovieListResult } from './components/MovieListResult';
import {
  getGenreFilterFromUrlSearchParam,
  getSearchQueryFromUrlSearchParams,
  getSortByFromUrlSearchParams,
  mapSearchQueryParamsToMoviesRequestParams,
  setGenreFilterToUrlSearchParams,
  setSearchQueryToUrlSearchParams,
  setSortByToUrlSearchParams,
} from './utils/MovieListPage.utils';
import React from 'react';
import { mapMovieDataResponseToRequiredFullMovieInfo } from './utils/mapper.utils';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { MovieListDataResponse } from './interfaces/movieData';
import { CREATE_MOVIE_URI, REQUEST_URI } from '~/constants/request.constants';
import styles from '~/assets/css/MovieListPage.module.css';
import {
  MOVIE_GENRES,
  SORT_OPTIONS,
} from '~/constants/movieListPage.constants';
import appStyles from '~/assets/css/App.css';
import { MovieListPageContext } from '~/interfaces/outletContext';
import { MovieListPageError } from '~/components/MovieListPageError';

type GetMovieListResponse = null | MovieListDataResponse;

export const loader: LoaderFunction = async ({
  request,
}): Promise<GetMovieListResponse> => {
  console.log('THe create movie URI is', CREATE_MOVIE_URI);
  const searchParams = new URL(request.url).searchParams;
  const queryParams = mapSearchQueryParamsToMoviesRequestParams(searchParams);
  const newUrl = new URL(`${REQUEST_URI}/movies`);
  Object.entries(queryParams).forEach((entry) =>
    newUrl.searchParams.append(entry[0], entry[1])
  );
  const response = await fetch(newUrl, {
    headers: { accept: 'application/json' },
    signal: request.signal,
  });
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as MovieListDataResponse;
};

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    { rel: 'stylesheet', href: appStyles },
  ];
};

export default function Root() {
  const revalidator = useRevalidator();
  const [searchParams, setSearchParams] = useSearchParams();
  const genreFilter = getGenreFilterFromUrlSearchParam(searchParams);
  const sortBy = getSortByFromUrlSearchParams(searchParams);
  const searchQuery = getSearchQueryFromUrlSearchParams(searchParams);
  const movieDataNullableResponse = useLoaderData<GetMovieListResponse>();
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
  const handleAddOrEditMovie = (movieId: number) => {
    navigate(`/${movieId}?${searchParams}`);
    revalidator.revalidate();
  };
  const outletContext: MovieListPageContext = {
    initialSearchQuery: searchQuery,
    onOpenSearchForm: handleOpenSearchForm,
    onSendSearchQuery: handleSendSearchQuery,
    onAddMovie: handleAddOrEditMovie,
    onEditMovie: handleAddOrEditMovie,
    onCloseEditMovie: handleDisplayMovieDetails,
    onCloseAddMovie: handleOpenSearchForm,
    onAddMovieClick: handleAddMovieClick,
  };
  const handleMovieEdit = (movieId: number) => {
    navigate(`/${movieId}/edit?${searchParams}`);
  };
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="My beautiful React app" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <Meta />
        <Links />
        <title>My React App</title>
      </head>
      <body>
        <div id="root">
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
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <MovieListPageError error={error} />
        <Scripts />
      </body>
    </html>
  );
};
