import React from 'react';

type Props = {
  children: React.ReactNode;
  absolutePositionX: number;
  absolutePositionY: number;
};

export const MenuContext = ({
  children,
  absolutePositionX,
  absolutePositionY,
}: Props) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: absolutePositionY,
        left: absolutePositionX,
      }}
    >
      {children}
    </div>
  );
};
