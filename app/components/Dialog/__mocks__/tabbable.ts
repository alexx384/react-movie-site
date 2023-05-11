import { TabbableOptions, CheckOptions } from 'tabbable';

const lib = jest.requireActual<typeof import('tabbable')>('tabbable');

export const tabbable = {
  __esModule: true,
  ...lib,
  tabbable: (node: Element, options?: TabbableOptions & CheckOptions) =>
    lib.tabbable(node, { ...options, displayCheck: 'none' }),
  focusable: (node: Element, options?: TabbableOptions & CheckOptions) =>
    lib.focusable(node, { ...options, displayCheck: 'none' }),
  isFocusable: (node: Element, options?: CheckOptions) =>
    lib.isFocusable(node, { ...options, displayCheck: 'none' }),
  isTabbable: (node: Element, options?: CheckOptions) =>
    lib.isTabbable(node, { ...options, displayCheck: 'none' }),
};

module.exports = tabbable;
