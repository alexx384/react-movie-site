import React from 'react';
import { MenuContextContainer } from '../MenuContextContainer';

type Props = {
  children: React.ReactNode;
  items: string[];
  onSelectMenuItem?: (itemName: string) => void;
};

export const MenuContext = ({ children, items, onSelectMenuItem }: Props) => {
  const [contextMenuState, setContextMenuState] = React.useState({
    isVisible: false,
    positionX: 0,
    positionY: 0,
  });
  React.useEffect(() => {
    const handleClick = () => {
      setContextMenuState({ ...contextMenuState, isVisible: false });
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [contextMenuState]);

  function handleContextMenu(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.preventDefault(); // prevent the default behaviour when right clicked
    setContextMenuState({
      isVisible: true,
      positionX: event.pageX,
      positionY: event.pageY,
    });
  }
  function handleChange(itemName: string) {
    onSelectMenuItem?.(itemName);
  }
  return (
    <div onContextMenu={handleContextMenu}>
      {children}
      {contextMenuState.isVisible && (
        <MenuContextContainer
          absolutePositionX={contextMenuState.positionX}
          absolutePositionY={contextMenuState.positionY}
          items={items}
          width="150px"
          onChange={handleChange}
        />
      )}
    </div>
  );
};
