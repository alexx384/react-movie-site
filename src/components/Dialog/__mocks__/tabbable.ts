import { TabbableOptions, CheckOptions } from 'tabbable';

const lib = jest.requireActual<typeof import('tabbable')>('tabbable');

// If you see error `SyntaxError: 'slot):not([inert]' is not a valid selector` then it is occurred because of a bug in a library nwsapi
// The latest working version is nwsapi@2.2.2
// For more information please refer to https://github.com/dperini/nwsapi/issues/83

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
