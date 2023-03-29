import styles from './MovieTile.module.css';
import { stringListToString } from '../utils/string';
import { MenuContext } from '../MenuContext';
import { MOVIE_TILE } from '../../constants/tests.constants';

type Props = {
  imageUrl: string;
  movieName: string;
  releaseYear: number;
  genres: string[];
  onClick?: (movieName: string) => void;
};

export const MovieTile = ({
  imageUrl,
  movieName,
  releaseYear,
  genres,
  onClick,
}: Props) => {
  function handleClick() {
    onClick?.(movieName);
  }
  return (
    <MenuContext
      menuItems={['Edit', 'Delete']}
      onSelectMenuItem={(itemName) => console.log('selected', itemName)}
    >
      <div
        className={styles.movieTile}
        onClick={handleClick}
        data-testid={MOVIE_TILE}
      >
        <img className={styles.moviePoster} src={imageUrl} alt={movieName} />
        <div className={styles.nameAndReleaseYear}>
          <h1 className={styles.movieName}>{movieName}</h1>
          <h2 className={styles.releaseYear}>{releaseYear}</h2>
        </div>
        <h2 className={styles.movieGenres}>{stringListToString(genres)}</h2>
      </div>
    </MenuContext>
  );
};
