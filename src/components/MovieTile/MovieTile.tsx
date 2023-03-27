import React from 'react';
import styles from './MovieTile.module.css';
import { stringListToString } from '../utils/string';
import { MenuContext } from './MenuContext';

type Props = {
  imageUrl: string;
  movieName: string;
  releaseYear: number;
  genres: string[];
  onClick?: () => void;
};

export const MovieTile = ({
  imageUrl,
  movieName,
  releaseYear,
  genres,
  onClick,
}: Props) => {
  const [isContextMenuActive, setContextMenuActive] = React.useState(false);
  function handleClick() {
    onClick?.();
  }
  function handleContextMenu(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.preventDefault(); // prevent the default behaviour when right clicked
    setContextMenuActive(!isContextMenuActive);
  }
  return (
    <div
      className={styles.movieTile}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <img src={imageUrl} alt={movieName} />
      <div className={styles.nameAndReleaseYear}>
        <h1>{movieName}</h1>
        <h2 className={styles.releaseYear}>{releaseYear}</h2>
      </div>
      <h2>{stringListToString(genres)}</h2>
      {isContextMenuActive && (
        <MenuContext>
          <ul>
            <li>Edit</li>
            <li>Delete</li>
          </ul>
        </MenuContext>
      )}
    </div>
  );
};
