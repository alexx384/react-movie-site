import './GenreItem.css';

export const GenreItem = ({ genreName, isSelected, onSelect }) => {
  function onItemKeyDownHandle(event) {
    if (event.key === 'Enter') {
      onItemClickHandle();
    }
  }
  function onItemClickHandle() {
    onSelect(genreName);
  }
  return (
    <li
      onClick={onItemClickHandle}
      onKeyDown={onItemKeyDownHandle}
      className={isSelected ? 'selectedGenreItem' : 'unselectedGenreItem'}
      tabIndex="0"
    >
      {genreName}
    </li>
  );
};
