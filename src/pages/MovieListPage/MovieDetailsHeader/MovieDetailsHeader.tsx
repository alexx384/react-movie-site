import styles from './MovieDetailsHeader.module.css';
import headerStyles from '../MovieListHeader.module.css';
import classNames from 'classnames';
import { MovieDetails } from '../../../components/MovieDetails';
import { useLoaderData } from 'react-router-dom';
import { GetMovieByIdResponse } from '../../../loaders/GetMovieByIdLoader';
import imageNotFound from '../../../assets/imageNotFound.png';
import {
  mapMovieDataToMovieDetailsInfo,
  useMovieDetailsContext,
} from '../MovieListPage.utils';
import { MOVIE_HEADER_SEARCH_ICON } from '../../../constants/tests.constants';

export const MovieDetailsHeader = () => {
  const result = useMovieDetailsContext();
  const { onOpenSearchForm } = result;
  const movieDataNullableResponse = useLoaderData() as GetMovieByIdResponse;
  const movieData = movieDataNullableResponse ?? {
    id: 0,
    title: '',
    tagline: '',
    vote_average: 0,
    vote_count: 0,
    release_date: '',
    poster_path: imageNotFound,
    overview: '',
    budget: 0,
    revenue: 0,
    genres: [],
    runtime: 0,
  };
  const movieDetails = mapMovieDataToMovieDetailsInfo(movieData);
  const handleShowSearchForm = () => {
    onOpenSearchForm();
  };
  return (
    <div className={headerStyles.header}>
      <div className={styles.controls}>
        <button
          className={classNames(
            'material-symbols-outlined',
            styles['controls-search']
          )}
          onClick={handleShowSearchForm}
          data-testid={MOVIE_HEADER_SEARCH_ICON}
        >
          search
        </button>
      </div>
      <MovieDetails {...movieDetails} />
    </div>
  );
};
