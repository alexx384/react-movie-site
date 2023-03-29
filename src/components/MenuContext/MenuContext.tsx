import React from 'react';
import { MenuContextContainer } from '../MenuContextContainer';

type Props = {
  children: React.ReactNode;
  menuItems: string[];
  menuItemWidht?: string;
  onSelectMenuItem?: (itemName: string) => void;
};

export const MenuContext = ({
  children,
  menuItems,
  menuItemWidht = '150px',
  onSelectMenuItem,
}: Props) => {
  const [contextMenuState, setContextMenuState] = React.useState({
    isVisible: false,
    positionX: 0,
    positionY: 0,
  });
  function handleContextMenu(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.preventDefault();
    setContextMenuState({
      isVisible: true,
      positionX: event.pageX,
      positionY: event.pageY,
    });
  }
  function handleChange(itemName: string) {
    onSelectMenuItem?.(itemName);
    handleHideMenu();
  }
  function handleHideMenu() {
    setContextMenuState({ ...contextMenuState, isVisible: false });
  }
  return (
    <div onContextMenu={handleContextMenu}>
      {children}
      {contextMenuState.isVisible && (
        <MenuContextContainer
          absolutePositionX={contextMenuState.positionX}
          absolutePositionY={contextMenuState.positionY}
          menuItems={menuItems}
          width={menuItemWidht}
          onChange={handleChange}
          onHideMenu={handleHideMenu}
        />
      )}
    </div>
  );
};
