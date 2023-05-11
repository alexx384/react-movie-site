import styles from './SortControl.module.css';
import React from 'react';
import { MenuContextContainer } from '../MenuContextContainer';
import {
  MOVIE_SELECTED_SORT_OPTION,
  MOVIE_SORT_CONTROL,
} from '~/constants/tests.constants';
import fontStyles from '~/assets/css/Font.module.css';
import classNames from 'classnames';
import { SHAMEFUL_TRIANGLE, SORT_BY } from '~/constants/sortControl.constants';

type Props = {
  options: string[];
  selectedOption: string;
  onSelect?: (option: string) => void;
};

export const SortControl = ({ options, selectedOption, onSelect }: Props) => {
  const [menuContext, setMenuContext] = React.useState({
    isMenuVisible: false,
    selectedOption: selectedOption,
  });
  function handleBlockClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.stopPropagation();
    setMenuContext({
      ...menuContext,
      isMenuVisible: !menuContext.isMenuVisible,
    });
  }
  function handleChange(itemName: string) {
    setMenuContext({
      ...menuContext,
      selectedOption: itemName,
      isMenuVisible: false,
    });
    onSelect?.(itemName);
  }
  function handleHideMenu() {
    setMenuContext({ ...menuContext, isMenuVisible: false });
  }

  return (
    <div
      className={styles.block}
      onClick={handleBlockClick}
      data-testid={MOVIE_SORT_CONTROL}
    >
      <button className={classNames(fontStyles['sort-label'], styles.label)}>
        {SORT_BY}
      </button>
      <button
        className={classNames(
          fontStyles['filter-item'],
          styles['selected-option']
        )}
        data-testid={MOVIE_SELECTED_SORT_OPTION}
      >
        {menuContext.selectedOption}
      </button>
      <button
        className={classNames(fontStyles['filter-item'], styles.triangle)}
      >
        {SHAMEFUL_TRIANGLE}
      </button>
      <div className={styles.menu}>
        {menuContext.isMenuVisible && (
          <MenuContextContainer
            menuItems={options}
            onChange={handleChange}
            onHideMenu={handleHideMenu}
          />
        )}
      </div>
    </div>
  );
};
