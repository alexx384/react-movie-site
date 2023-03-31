import styles from './MovieTile.module.css';
import { MenuContext } from '../MenuContext';
import { MOVIE_TILE } from '../../constants/tests.constants';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';

type Props = {
  imageUrl: string;
  movieName: string;
  releaseYear: number;
  genre: string;
  onClick?: (movieName: string) => void;
};

export const MovieTile = ({
  imageUrl,
  movieName,
  releaseYear,
  genre,
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
        className={styles.block}
        onClick={handleClick}
        data-testid={MOVIE_TILE}
      >
        <img className={styles.poster} src={imageUrl} alt={movieName} />
        <div className={styles['name-and-year']}>
          <h1 className={classNames(fontStyles['tile-name'], styles.name)}>
            {movieName}
          </h1>
          <h2 className={classNames(fontStyles['tile-year'], styles.year)}>
            {releaseYear}
          </h2>
        </div>
        <h2 className={classNames(fontStyles.subtitle, styles.genre)}>
          {genre}
        </h2>
      </div>
    </MenuContext>
  );
};
