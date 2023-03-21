import { useState } from 'react';
import { GenreItem } from './GenreItem';
import './GenreSelect.css';

type GenreSelectProps = {
  listOfGenres: string[];
  initiallySelectedGenreName: string;
  onSelectGenre: (genreName: string) => void;
};

export const GenreSelect = ({
  listOfGenres,
  initiallySelectedGenreName,
  onSelectGenre,
}: GenreSelectProps) => {
  const [selectedGenreName, setSelectedGenreName] = useState(
    initiallySelectedGenreName
  );
  function onGenreItemSelectHandle(genreName: string) {
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
