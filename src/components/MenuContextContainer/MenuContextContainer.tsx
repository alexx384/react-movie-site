import React from 'react';
import styles from './MenuContextContainer.module.css';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';

type Props = {
  absolutePositionX: number;
  absolutePositionY: number;
  menuItems: string[];
  width: string;
  onChange?: (itemName: string) => void;
  onHideMenu?: (event: MouseEvent) => void;
};

export const MenuContextContainer = ({
  absolutePositionX,
  absolutePositionY,
  menuItems,
  width,
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
      style={{
        position: 'absolute',
        top: absolutePositionY,
        left: absolutePositionX,
        width: width,
      }}
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
