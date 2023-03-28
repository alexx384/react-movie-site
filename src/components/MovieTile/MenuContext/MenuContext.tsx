import React from 'react';
import styles from './MenuContext.module.css';

type Props = {
  absolutePositionX: number;
  absolutePositionY: number;
  items: string[];
  onChange?: (itemName: string) => void;
};

export const MenuContext = ({
  absolutePositionX,
  absolutePositionY,
  items,
  onChange,
}: Props) => {
  function handleClick(itemName: string) {
    onChange?.(itemName);
  }
  return (
    <div
      className={styles.menuContext}
      style={{
        position: 'absolute',
        top: absolutePositionY,
        left: absolutePositionX,
      }}
    >
      <ul className={styles.menuContextList}>
        {items.map((itemName) => (
          <li
            className={styles.menuContextItem}
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
