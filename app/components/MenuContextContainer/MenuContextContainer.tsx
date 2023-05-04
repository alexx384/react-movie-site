import React from 'react';
import styles from './MenuContextContainer.module.css';
import fontStyles from '~/assets/css/Font.module.css';
import classNames from 'classnames';
import { MENU_CONTEXT_CONTAINER } from '~/constants/tests.constants';

type Props = {
  menuItems: string[];
  onChange?: (itemName: string) => void;
  onHideMenu?: (event: MouseEvent) => void;
};

export const MenuContextContainer = ({
  menuItems,
  onChange,
  onHideMenu,
}: Props) => {
  const boxRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        onHideMenu?.(event);
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onHideMenu]);

  function handleClick(itemName: string) {
    onChange?.(itemName);
  }
  return (
    <div
      ref={boxRef}
      className={styles.block}
      data-testid={MENU_CONTEXT_CONTAINER}
    >
      <ul className={styles.list}>
        {menuItems.map((itemName) => (
          <li
            className={classNames(fontStyles.option, styles.item)}
            onClick={() => handleClick(itemName)}
            key={itemName}
          >
            {itemName}
          </li>
        ))}
      </ul>
    </div>
  );
};
