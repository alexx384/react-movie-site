import styles from './SortControl.module.css';
import React from 'react';
import { MenuContextContainer } from '../MenuContextContainer';

type Props = {
  options: string[];
  selectedOption: string;
  onSelect?: (option: string) => {};
};

export const SortControl = ({ options, selectedOption, onSelect }: Props) => {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [menuContext, setMenuContext] = React.useState({
    isMenuVisible: false,
    positionX: 0,
    positionY: 0,
    selectedOption: selectedOption,
    width: '150px',
  });
  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setMenuContext({ ...menuContext, isMenuVisible: false });
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [menuContext]);

  function handleClick() {
    const current = boxRef.current;
    setMenuContext({
      ...menuContext,
      isMenuVisible: !menuContext.isMenuVisible,
      positionX: current ? current.offsetLeft : 0,
      positionY: current ? current.offsetTop + current.offsetHeight : 0,
      width: current?.offsetWidth + 'px' ?? '150px',
    });
  }
  function handleChange(itemName: string) {
    setMenuContext({ ...menuContext, selectedOption: itemName });
    onSelect?.(itemName);
  }

  return (
    <>
      <div ref={boxRef} className={styles.sortControl} onClick={handleClick}>
        <button className={styles.sortControlLabel}>SORT BY</button>
        <button className={styles.sortControlSelectedOption}>
          {menuContext.selectedOption ?? ''}
        </button>
        <button className={styles.sortControlShamefulTriangle}>▼</button>
      </div>
      {menuContext.isMenuVisible && (
        <MenuContextContainer
          absolutePositionX={menuContext.positionX}
          absolutePositionY={menuContext.positionY}
          items={options}
          width={menuContext.width}
          onChange={handleChange}
        />
      )}
    </>
  );
};