import { useState } from 'react';

export const GenreSelect = ({ listOfGenres, selectedGenre, onSelect }) => {
  const [genres, setGenres] = useState(
    listOfGenres.map((genre) => {
      return { name: genre, isSelected: selectedGenre === genre };
    })
  );

  function updateGenres(selectedGenre) {
    onSelect(selectedGenre);
    setGenres(
      listOfGenres.map((genre) => {
        return { name: genre, isSelected: selectedGenre === genre };
      })
    );
  }

  return (
    <div style={{ display: 'flex', backgroundColor: 'DodgerBlue' }}>
      {genres.map((genre) => {
        const color = genre.isSelected ? '#FF6666' : '#f1f1f1';
        return (
          <div
            style={{
              backgroundColor: color,
              padding: '20px',
              margin: '10px',
              fontSize: '30px',
            }}
            onClick={() => updateGenres(genre.name)}
            key={genre.name}
          >
            {genre.name}
          </div>
        );
      })}
    </div>
  );
};
