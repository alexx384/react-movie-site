import styles from './SortControl.module.css';
import React from 'react';
import { MenuContextContainer } from '../MenuContextContainer';
import { MOVIE_SORT_CONTROL } from '../../constants/tests.constants';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';

type Props = {
  options: string[];
  selectedOption: string;
  onSelect?: (option: string) => {};
};

export const SORT_BY = 'SORT BY';
export const SHAMEFUL_TRIANGLE = '▼';

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
