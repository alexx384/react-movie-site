import { GenreItem } from './GenreItem';

export const GenreSelect = ({
  listOfGenres,
  selectedGenreName,
  onSelect: onSelectGenre,
}) => {
  let selectedGenreProps;
  function initSelectedGenreProps(genreProps) {
    if (selectedGenreProps === undefined) {
      selectedGenreProps = genreProps;
    }
  }
  function onSelectGenreItem(genreProps) {
    selectedGenreProps.deselect();
    selectedGenreProps = genreProps;
    onSelectGenre(genreProps.genreName);
  }

  return (
    <div style={{ display: 'flex', backgroundColor: 'DodgerBlue' }}>
      {listOfGenres.map((genreName, index) => {
        return (
          <GenreItem
            genreName={genreName}
            isInitiallySelected={genreName === selectedGenreName}
            onSelect={onSelectGenreItem}
            onInitiallySelected={initSelectedGenreProps}
            key={index}
          />
        );
      })}
    </div>
  );
};
