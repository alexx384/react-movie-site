import React from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
  container: Element | DocumentFragment;
  key?: null | string;
};

export const Portal = ({ children, container, key }: PortalProps) => {
  return createPortal(children, container, key);
};
