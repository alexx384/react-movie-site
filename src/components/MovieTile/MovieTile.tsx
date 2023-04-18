import styles from './MovieTile.module.css';
import { MOVIE_TILE, MOVIE_TILE_IMAGE } from '../../constants/tests.constants';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';
import { ThreeDotsButton } from './ThreeDotsButton';

export interface MovieBasicInfo {
  id: string;
  imageUrl: string;
  movieName: string;
  releaseYear: number;
  genre: string;
}

export type Props = {
  info: MovieBasicInfo;
  onClick?: (movieId: string) => void;
};

export const MovieTile = ({ info, onClick }: Props) => {
  function handleClick() {
    onClick?.(info.id);
  }
  function handleSelectOption(itemName: string) {
    console.log(itemName);
  }

  return (
    <div className={styles.block} data-testid={MOVIE_TILE}>
      <ThreeDotsButton onSelectOption={handleSelectOption}>
        <img
          onClick={handleClick}
          className={styles.poster}
          src={info.imageUrl}
          alt={info.movieName}
          data-testid={MOVIE_TILE_IMAGE}
        />
      </ThreeDotsButton>
      <div className={styles['name-and-year']}>
        <h1 className={classNames(fontStyles['tile-name'], styles.name)}>
          {info.movieName}
        </h1>
        <h2 className={classNames(fontStyles['tile-year'], styles.year)}>
          {info.releaseYear}
        </h2>
      </div>
      <h2 className={classNames(fontStyles.subtitle, styles.genre)}>
        {info.genre}
      </h2>
    </div>
  );
};
