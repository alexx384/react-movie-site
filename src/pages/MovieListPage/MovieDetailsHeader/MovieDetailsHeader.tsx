import styles from './MovieDetailsHeader.module.css';
import headerStyles from '../MovieListHeader.module.css';
import classNames from 'classnames';
import { MovieDetails } from '../../../components/MovieDetails';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { GetMovieByIdResponse } from '../../../loaders/GetMovieByIdLoader';
import { MOVIE_HEADER_SEARCH_ICON } from '../../../constants/tests.constants';
import { mapMovieDataResponseToRequiredFullMovieInfo } from '../../../utils/mapper.utils';

export interface MovieDetailsContext {
  onOpenSearchForm: () => void;
}

export const MovieDetailsHeader = () => {
  const { onOpenSearchForm } = useOutletContext<MovieDetailsContext>();
  const movieData = useLoaderData() as GetMovieByIdResponse;
  const movieDetails = mapMovieDataResponseToRequiredFullMovieInfo(movieData);
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
