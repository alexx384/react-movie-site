import styles from './MovieTile.module.css';
import { MOVIE_TILE, MOVIE_TILE_IMAGE } from '../../constants/tests.constants';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';
import { ThreeDotsButton } from './ThreeDotsButton';

type Props = {
  id: string;
  imageUrl: string;
  movieName: string;
  releaseYear: number;
  genre: string;
  onClick?: (movieName: string) => void;
};

export const MovieTile = ({
  id,
  imageUrl,
  movieName,
  releaseYear,
  genre,
  onClick,
}: Props) => {
  function handleClick() {
    onClick?.(id);
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
          src={imageUrl}
          alt={movieName}
          data-testid={MOVIE_TILE_IMAGE}
        />
      </ThreeDotsButton>
      <div className={styles['name-and-year']}>
        <h1 className={classNames(fontStyles['tile-name'], styles.name)}>
          {movieName}
        </h1>
        <h2 className={classNames(fontStyles['tile-year'], styles.year)}>
          {releaseYear}
        </h2>
      </div>
      <h2 className={classNames(fontStyles.subtitle, styles.genre)}>{genre}</h2>
    </div>
  );
};
