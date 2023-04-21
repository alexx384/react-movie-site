import styles from './MovieDetailsHeader.module.css';
import headerStyles from '../MovieListHeader.module.css';
import classNames from 'classnames';
import { useRouteError } from 'react-router-dom';
import { useMovieDetailsContext } from '../MovieListPage.utils';
import imageNotFound from '../../../assets/imageNotFound.png';
import { MOVIE_HEADER_SEARCH_ICON } from '../../../constants/tests.constants';
import {
  MovieDetails,
  MovieDetailsInfo,
} from '../../../components/MovieDetails';

export const MovieDetailsHeaderError = () => {
  const result = useMovieDetailsContext();
  const { onOpenSearchForm } = result;
  const error = useRouteError() as { status: string };
  const movieDetails: MovieDetailsInfo = {
    id: '',
    imageUrl: imageNotFound,
    movieName: `${error.status}`,
    releaseYear: 0,
    rating: 0,
    description: 'Something went wrong',
    genre: '',
    durationInMinutes: 0,
  };
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
