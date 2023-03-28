import styles from './MenuContextContainer.module.css';

type Props = {
  absolutePositionX: number;
  absolutePositionY: number;
  items: string[];
  width: string;
  onChange?: (itemName: string) => void;
};

export const MenuContextContainer = ({
  absolutePositionX,
  absolutePositionY,
  items,
  width,
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
        width: width,
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
