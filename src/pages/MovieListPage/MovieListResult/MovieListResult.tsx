import styles from './MovieListResult.module.css';
import fontStyles from '../../../Font.module.css';
import { MovieTile, MovieBasicInfo } from '../../../components/MovieTile';
import classNames from 'classnames';

type Props = {
  movieList: MovieBasicInfo[];
  totalMovieNumber: string;
  onMovieClick?: (movieId: string) => void;
};

export const MovieListResult = ({
  movieList,
  totalMovieNumber,
  onMovieClick,
}: Props) => {
  return (
    <>
      <h3 className={classNames(fontStyles.input, styles['result-info'])}>
        <b>{totalMovieNumber}</b> movies found
      </h3>
      <ul className={styles['movie-list']}>
        {movieList.map((movieInfo) => (
          <li key={movieInfo.id}>
            <MovieTile info={movieInfo} onClick={onMovieClick} />
          </li>
        ))}
      </ul>
    </>
  );
};
