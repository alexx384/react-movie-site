import React from 'react';
import styles from './ThreeDotsButton.module.css';
import { MenuContextContainer } from '../../MenuContextContainer';
import { THREE_DOTS_BUTTON_BLOCK } from '../../../constants/tests.constants';
import { THREE_DOTS_SYMBOL } from '../../../constants/threeDotsButton.constants';
import {
  MOVIE_TILE_DELETE_OPTION,
  MOVIE_TILE_EDIT_OPTION,
  MOVIE_TILE_OPTIONS,
} from '../../../constants/movieListPage.constants';

type Props = {
  children: React.ReactNode;
  onSelectEditOption?: () => void;
  onSelectDeleteOption?: () => void;
};

export const ThreeDotsButton = ({
  children,
  onSelectEditOption,
  onSelectDeleteOption,
}: Props) => {
  const [isMenuShown, setMenuShown] = React.useState(false);
  const [isBtnShown, setBtnShown] = React.useState(true);
  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    setMenuShown(true);
    setBtnShown(false);
  }
  function handleHideMenu() {
    setMenuShown(false);
    setBtnShown(true);
  }
  function handleChange(itemName: string) {
    if (itemName === MOVIE_TILE_EDIT_OPTION) {
      onSelectEditOption?.();
    } else if (itemName === MOVIE_TILE_DELETE_OPTION) {
      onSelectDeleteOption?.();
    }
    handleHideMenu();
  }
  return (
    <div className={styles.block} data-testid={THREE_DOTS_BUTTON_BLOCK}>
      {children}
      {isBtnShown && (
        <button className={styles.btn} onClick={handleClick}>
          {THREE_DOTS_SYMBOL}
        </button>
      )}
      {isMenuShown && (
        <div className={styles.menu}>
          <MenuContextContainer
            menuItems={MOVIE_TILE_OPTIONS}
            onChange={handleChange}
            onHideMenu={handleHideMenu}
          />
        </div>
      )}
    </div>
  );
};
