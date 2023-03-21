import { useState } from 'react';
import { GenreItem } from './GenreItem';
import './GenreSelect.css';

export const GenreSelect = ({
  listOfGenres,
  initiallySelectedGenreName,
  onSelect: onSelectGenre,
}) => {
  const [selectedGenreName, setSelectedGenreName] = useState(
    initiallySelectedGenreName
  );
  function onGenreItemSelectHandle(genreName) {
    setSelectedGenreName(genreName);
    onSelectGenre(genreName);
  }

  return (
    <div className="genreSelect">
      <ul>
        {listOfGenres.map((genreName, index) => {
          return (
            <GenreItem
              genreName={genreName}
              isSelected={genreName === selectedGenreName}
              onSelect={onGenreItemSelectHandle}
              key={index}
            />
          );
        })}
      </ul>
    </div>
  );
};
