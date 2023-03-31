import React from 'react';
import styles from './ThreeDotsButton.module.css';
import { MenuContextContainer } from '../../MenuContextContainer';
import { THREE_DOTS_BUTTON_BLOCK } from '../../../constants/tests.constants';

type Props = {
  children: React.ReactNode;
  onSelectOption?: (itemName: string) => void;
};

export const THREE_DOTS_SYMBOL = '⋮';

export const ThreeDotsButton = ({ children, onSelectOption }: Props) => {
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
    onSelectOption?.(itemName);
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
            menuItems={['Edit', 'Delete']}
            onChange={handleChange}
            onHideMenu={handleHideMenu}
          />
        </div>
      )}
    </div>
  );
};
