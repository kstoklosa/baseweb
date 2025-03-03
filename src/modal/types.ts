/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type { OverrideT } from '../helpers/overrides';
import { SIZE, ROLE, CLOSE_SOURCE } from './constants';

export type SizeT = keyof typeof SIZE;
export type SizePropT = SizeT | number | string;

export type RoleT = keyof typeof ROLE;
export type RolePropT = RoleT | string;

export type CloseSourceT = keyof typeof CLOSE_SOURCE;

export type OverridesT = {
  Root?: OverrideT;
  Dialog?: OverrideT;
  DialogContainer?: OverrideT;
  Close?: OverrideT;
};

// Props shared by all flavors of modal
export type ModalPropsT = {
  /** Sets whether the Modal should be displayed by easing in and out */
  animate: boolean;
  /** If true, focus will shift to the first interactive element within the modal.
   * If false, the modal container itself will receive focus.
   * Moving focus into a newly opened modal is important for accessibility purposes, so please be careful!
   */
  autoFocus: boolean;
  /** If true, focus will be locked to elements within the modal.
   */
  focusLock?: boolean;
  name?: string;
  /**
   * if true, will return focus to the previous position on trap disable.
   * Optionally, can pass focus options instead of `true` to control the focus
   * more precisely (ie. `{ preventScroll: true }`)
   */
  returnFocus?: boolean | FocusOptions | ((returnTo: Element) => boolean | FocusOptions);
  /** Modal content. The children-as-function API may be preferable
   * for performance reasons (wont render until opened) */
  children?: React.ReactNode | (() => React.ReactNode);
  /** Whether the modal should be closeable by the user
   *  (either via escape, dialog container click, etc). You can set this to
   * false if your modal has an action that the user must take before closing.*/
  closeable: boolean;
  isOpen: boolean;
  /** Where to mount the modal */
  mountNode?: HTMLElement;
  /** A callback that is invoked when the modal will close.
   * Callback is passed a constant identifying what triggered the close. */
  onClose?: (a: { closeSource?: CloseSourceT }) => unknown;
  overrides: OverridesT;
  /** Which accessibility role this modal should have. */
  role: RolePropT;
  /** Controls the size of the modal (primarily width).
   * Can be a SIZE constant or css width property value. */
  size: SizePropT;
};

export type ModalPropsWithoutChildrenT = Omit<ModalPropsT, 'children'>;

export type ModalStateT = {
  isVisible: boolean;
  mounted: boolean;
  isFocusVisible: boolean;
};

export type SharedStylePropsArgT = {
  $animate: boolean;
  $isVisible: boolean;
  $isOpen: boolean;
  $size: SizePropT;
  $role: RolePropT;
  $closeable: boolean;
  $isFocusVisible: boolean;
};
