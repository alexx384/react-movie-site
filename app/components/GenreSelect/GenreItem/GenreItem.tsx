import styles from './GenreItem.module.css';
import classNames from 'classnames';
import {
  GENRE_ITEM_SELECTED,
  GENRE_ITEM_UNSELECTED,
} from '~/constants/tests.constants';
import fontStyles from '~/assets/css/Font.module.css';

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
  function handleItemKeyDown(event: React.KeyboardEvent<HTMLLIElement>) {
    if (event.key === 'Enter') {
      handleItemClick();
    }
  }
  function handleItemClick() {
    onSelect?.(genreName);
  }
  return (
    <li
      onClick={handleItemClick}
      onKeyDown={handleItemKeyDown}
      className={classNames(
        {
          [styles['selected-item']]: isSelected,
          [styles['unselected-item']]: !isSelected,
        },
        fontStyles['filter-item']
      )}
      tabIndex={0}
      data-testid={isSelected ? GENRE_ITEM_SELECTED : GENRE_ITEM_UNSELECTED}
    >
      {genreName}
    </li>
  );
};
