/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import type { OverrideT } from '../helpers/overrides';

export type FormControlStateT = {
  captionId: string;
};

export type OverridesT = {
  /** Customizes the label element. */
  Label?: OverrideT;
  /** Customizes the label end enhancer element. */
  LabelEndEnhancer?: OverrideT;
  /** Customizes the label container element. */
  LabelContainer?: OverrideT;
  /** Customizes the caption element. */
  Caption?: OverrideT;
  /** Customizes the container element. */
  ControlContainer?: OverrideT;
};
export type FormControlPropsT = {
  overrides?: OverridesT;
  /** A label rendered above the input field. */
  label?: React.ReactNode | ((props: {}) => React.ReactNode) | undefined | null;
  /** A caption rendered below the input field. */
  caption?: React.ReactNode | ((props: {}) => React.ReactNode) | undefined | null;
  /** Displays label in light gray color if true */
  disabled?: boolean;
  /** Error state of the input. If an error prop passed it will be rendered in place of caption as an error message. */
  error?: React.ReactNode | ((props: {}) => React.ReactNode);
  /** Positive state of the input. If an error prop passed it will be rendered in place of positive as an error message. */
  positive?: React.ReactNode | ((props: {}) => React.ReactNode);
  /** The id of the related form element. Defaults to the id property of the child, if any. */
  htmlFor?: string;
  /** Adds a label end enhancer to the label */
  labelEndEnhancer?: React.ReactNode | ((props: {}) => React.ReactNode) | null;
  /** Adds a length counter to the form control. If your input does not have a "string" value exposed as a prop, you provide the length as an object.*/
  counter?:
    | boolean
    | {
        length?: number;
        maxLength?: number;
        error?: boolean;
      };
  children: React.ReactNode;
};

export type StylePropsT = {
  $disabled?: boolean;
  $error?: boolean;
  $positive?: boolean;
  $length?: number;
  $maxLength?: number;
  $counterError?: boolean;
};
