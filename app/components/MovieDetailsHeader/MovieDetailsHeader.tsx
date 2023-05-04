import styles from './MovieDetailsHeader.module.css';
import headerStyles from './MovieDetailsHeader.module.css';
import classNames from 'classnames';
import { MovieDetails } from '../MovieDetails';
import { MOVIE_HEADER_SEARCH_ICON } from '../../constants/tests.constants';
import { mapMovieDataResponseToRequiredFullMovieInfo } from '../../utils/mapper.utils';
import { MovieIdContext } from '~/interfaces/outletContext';

export interface MovieDetailsCallbacks {
  onOpenSearchForm: () => void;
}

export interface MovieDetailsHeaderProps extends MovieIdContext {}

export const MovieDetailsHeader = ({
  onOpenSearchForm,
  movieData,
}: MovieDetailsHeaderProps) => {
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
