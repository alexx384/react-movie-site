import styles from './MovieDetailsHeader.module.css';
import headerStyles from '../MovieListHeader.module.css';
import classNames from 'classnames';
import { MovieDetails } from '../../../components/MovieDetails';
import { useLoaderData } from 'react-router-dom';
import { GetMovieByIdResponse } from '../../../loaders/GetMovieByIdLoader';
import {
  mapMovieDataToMovieDetailsInfo,
  useMovieDetailsContext,
} from '../MovieListPage.utils';
import { MOVIE_HEADER_SEARCH_ICON } from '../../../constants/tests.constants';

export const MovieDetailsHeader = () => {
  const { onOpenSearchForm } = useMovieDetailsContext();
  const movieData = useLoaderData() as GetMovieByIdResponse;
  const movieDetails = mapMovieDataToMovieDetailsInfo(movieData);
  return (
    <div className={headerStyles.header}>
      <div className={styles.controls}>
        <button
          className={classNames(
            'material-symbols-outlined',
            styles['controls-search']
          )}
          onClick={onOpenSearchForm}
          data-testid={MOVIE_HEADER_SEARCH_ICON}
        >
          search
        </button>
      </div>
      <MovieDetails {...movieDetails} />
    </div>
  );
};
