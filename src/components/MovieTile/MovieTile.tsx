import styles from './MovieTile.module.css';
import { MOVIE_TILE, MOVIE_TILE_IMAGE } from '../../constants/tests.constants';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';
import { ThreeDotsButton } from './ThreeDotsButton';
import { RequiredBasicMovieInfo } from '../../interfaces/movieInfo';
import { arrayToString } from '../../utils/string.utils';
import { mapGenreIdsToGenreValues } from '../../utils/mapper.utils';

export type Props = {
  info: RequiredBasicMovieInfo;
  onClick?: (movieId: number) => void;
  onMovieEdit?: (movieId: number) => void;
  onMovieDelete?: (movieId: number) => void;
};

export const MovieTile = ({
  info,
  onClick,
  onMovieEdit,
  onMovieDelete,
}: Props) => {
  const handleClick = () => {
    onClick?.(info.id);
  };
  const handleSelectEditOption = () => {
    onMovieEdit?.(info.id);
  };
  const handleSelectDeleteOption = () => {
    onMovieDelete?.(info.id);
  };
  const movieGenres = mapGenreIdsToGenreValues(info.genreIds);
  return (
    <div className={styles.block} data-testid={MOVIE_TILE}>
      <ThreeDotsButton
        onSelectEditOption={handleSelectEditOption}
        onSelectDeleteOption={handleSelectDeleteOption}
      >
        <img
          onClick={handleClick}
          className={styles.poster}
          src={info.movieURL}
          alt={info.title}
          data-testid={MOVIE_TILE_IMAGE}
        />
      </ThreeDotsButton>
      <div className={styles['name-and-year']}>
        <h1 className={classNames(fontStyles['tile-name'], styles.name)}>
          {info.title}
        </h1>
        <h2 className={classNames(fontStyles['tile-year'], styles.year)}>
          {info.releaseDate.getFullYear()}
        </h2>
      </div>
      <h2 className={classNames(fontStyles.subtitle, styles.genre)}>
        {arrayToString(movieGenres)}
      </h2>
    </div>
  );
};
