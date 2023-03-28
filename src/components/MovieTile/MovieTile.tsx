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
  const [contextMenuState, setContextMenuState] = React.useState({
    isVisible: false,
    positionX: 0,
    positionY: 0,
  });
  React.useEffect(() => {
    const handleClick = () =>
      setContextMenuState({
        isVisible: false,
        positionX: 0,
        positionY: 0,
      });
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  function handleClick() {
    onClick?.();
  }
  function handleContextMenu(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.preventDefault(); // prevent the default behaviour when right clicked
    setContextMenuState({
      isVisible: true,
      positionX: event.pageX,
      positionY: event.pageY,
    });
  }
  return (
    <div
      className={styles.movieTile}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <img className={styles.moviePoster} src={imageUrl} alt={movieName} />
      <div className={styles.nameAndReleaseYear}>
        <h1 className={styles.movieName}>{movieName}</h1>
        <h2 className={styles.releaseYear}>{releaseYear}</h2>
      </div>
      <h2 className={styles.movieGenres}>{stringListToString(genres)}</h2>
      {contextMenuState.isVisible && (
        <MenuContext
          absolutePositionX={contextMenuState.positionX}
          absolutePositionY={contextMenuState.positionY}
          items={['Edit', 'Delete']}
          onChange={(itemName) => console.log(itemName)}
        />
      )}
    </div>
  );
};
