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
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [menuContext, setMenuContext] = React.useState({
    isMenuVisible: false,
    positionX: 0,
    positionY: 0,
    selectedOption: selectedOption,
    width: '150px',
  });
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
    setMenuContext({
      ...menuContext,
      selectedOption: itemName,
      isMenuVisible: false,
    });
    onSelect?.(itemName);
  }
  function handleHideMenu(event: MouseEvent) {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setMenuContext({ ...menuContext, isMenuVisible: false });
    }
  }

  return (
    <>
      <div
        ref={boxRef}
        className={styles.block}
        onClick={handleClick}
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
      </div>
      {menuContext.isMenuVisible && (
        <MenuContextContainer
          absolutePositionX={menuContext.positionX}
          absolutePositionY={menuContext.positionY}
          menuItems={options}
          width={menuContext.width}
          onChange={handleChange}
          onHideMenu={handleHideMenu}
        />
      )}
    </>
  );
};
