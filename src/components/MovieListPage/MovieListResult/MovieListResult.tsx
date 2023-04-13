import styles from './MovieListResult.module.css';
import fontStyles from '../../../Font.module.css';
import { MovieTile, Props as MovieTileProps } from '../../MovieTile';
import classNames from 'classnames';

type Props = {
  movieList: MovieTileProps[];
};

export const MovieListResult = ({ movieList }: Props) => {
  return (
    <>
      <h3 className={classNames(fontStyles.input, styles['result-info'])}>
        <b>{movieList.length}</b> movies found
      </h3>
      <ul className={styles['movie-list']}>
        {movieList.slice(0, 6).map((movieInfo) => (
          <li>
            <MovieTile
              id={movieInfo.id}
              imageUrl={movieInfo.imageUrl}
              movieName={movieInfo.movieName}
              releaseYear={movieInfo.releaseYear}
              genre={movieInfo.genre}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
