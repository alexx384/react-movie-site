import styles from '../MovieDetailsHeader.module.css';
import classNames from 'classnames';
import imageNotFound from '~/assets/imageNotFound.png';
import { MOVIE_HEADER_SEARCH_ICON } from '../../../constants/tests.constants';
import { MovieDetails } from '../../MovieDetails';
import { RequiredFullMovieInfo } from '../../../interfaces/movieInfo';
import { MovieDetailsCallbacks } from '../MovieDetailsHeader';

export interface MovieDetailsHeaderErrorProps extends MovieDetailsCallbacks {
  error: unknown;
}

export const MovieDetailsHeaderError = ({
  onOpenSearchForm,
  error,
}: MovieDetailsHeaderErrorProps) => {
  const movieDetails: RequiredFullMovieInfo = {
    id: 0,
    movieURL: imageNotFound,
    title: String(error),
    releaseDate: new Date(0, 0),
    rating: 0,
    overview: 'Something went wrong',
    genreIds: new Set(),
    runtime: 0,
  };
  return (
    <div className={styles.header}>
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
