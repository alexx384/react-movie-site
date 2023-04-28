import styles from './MovieDetailsHeader.module.css';
import headerStyles from '../MovieListHeader.module.css';
import classNames from 'classnames';
import { useOutletContext, useRouteError } from 'react-router-dom';
import imageNotFound from '../../../assets/imageNotFound.png';
import { MOVIE_HEADER_SEARCH_ICON } from '../../../constants/tests.constants';
import { MovieDetails } from '../../../components/MovieDetails';
import { RequiredFullMovieInfo } from '../../../interfaces/movieInfo';
import { MovieDetailsContext } from './MovieDetailsHeader';

export const MovieDetailsHeaderError = () => {
  const { onOpenSearchForm } = useOutletContext<MovieDetailsContext>();
  const error = useRouteError() as { status: string };
  const movieDetails: RequiredFullMovieInfo = {
    id: 0,
    movieURL: imageNotFound,
    title: error.status,
    releaseDate: new Date(0, 0),
    rating: 0,
    overview: 'Something went wrong',
    genreIds: new Set(),
    runtime: 0,
  };
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
