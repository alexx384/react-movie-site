import styles from './GenreItem.module.css';

type GenreItemProps = {
  genreName: string;
  isSelected: boolean;
  onSelect?: (genreName: string) => void;
};

export const GenreItem = ({
  genreName,
  isSelected,
  onSelect,
}: GenreItemProps) => {
  function onItemKeyDownHandle(event: React.KeyboardEvent<HTMLLIElement>) {
    if (event.key === 'Enter') {
      onItemClickHandle();
    }
  }
  function onItemClickHandle() {
    onSelect?.(genreName);
  }
  return (
    <li
      onClick={onItemClickHandle}
      onKeyDown={onItemKeyDownHandle}
      className={
        isSelected ? styles.selectedGenreItem : styles.unselectedGenreItem
      }
      tabIndex={0}
      data-testid={isSelected ? 'selectedGenreItem' : 'unselectedGenreItem'}
    >
      {genreName}
    </li>
  );
};
