import { useState } from 'react';
import { GenreItem } from './GenreItem';

export const GenreSelect = ({
  listOfGenres,
  initiallySelectedGenreName,
  onSelect: onSelectGenre,
}) => {
  const [selectedGenreName, setSelectedGenreName] = useState(
    initiallySelectedGenreName
  );
  function onSelectGenreItem(genreName) {
    setSelectedGenreName(genreName);
    onSelectGenre(genreName);
  }

  return (
    <div style={{ display: 'flex', backgroundColor: 'DodgerBlue' }}>
      {listOfGenres.map((genreName, index) => {
        return (
          <GenreItem
            genreName={genreName}
            isSelected={genreName === selectedGenreName}
            onSelect={onSelectGenreItem}
            key={index}
          />
        );
      })}
    </div>
  );
};
