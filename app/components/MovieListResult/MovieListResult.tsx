import styles from './MovieListResult.module.css';
import fontStyles from '~/assets/css/Font.module.css';
import { MovieTile } from '../MovieTile';
import classNames from 'classnames';
import { RequiredBasicMovieInfo } from '~/interfaces/movieInfo';

type Props = {
  movieList: RequiredBasicMovieInfo[];
  totalMovieNumber: string;
  onMovieClick?: (movieId: number) => void;
  onMovieEdit?: (movieId: number) => void;
  onMovieDelete?: (movieId: number) => void;
};

export const MovieListResult = ({
  movieList,
  totalMovieNumber,
  onMovieClick,
  onMovieEdit,
  onMovieDelete,
}: Props) => {
  return (
    <>
      <h3 className={classNames(fontStyles.input, styles['result-info'])}>
        <b>{totalMovieNumber}</b> movies found
      </h3>
      <ul className={styles['movie-list']}>
        {movieList.map((movieInfo) => (
          <li key={movieInfo.id}>
            <MovieTile
              info={movieInfo}
              onClick={onMovieClick}
              onMovieEdit={onMovieEdit}
              onMovieDelete={onMovieDelete}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
