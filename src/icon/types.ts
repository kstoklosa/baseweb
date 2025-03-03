/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type { OverrideT } from '../helpers/overrides';

export type OverridesT = {
  Svg?: OverrideT;
};

export type SizeT = number | string;
export type ColorT = string;

export type StyledComponentArgsT = {
  $size?: SizeT;
  $color?: ColorT;
};

export type IconPropsT = React.SVGAttributes<SVGElement> & {
  children?: React.ReactNode;
  /** Size of element, will be passed to the svg width/height style. Can also be a value included in */
  size?: SizeT;
  /** Color of icon, will be used as svg fill */
  color?: ColorT;
  /** Allows you to set the SVG `<title>` label, which is used for accessibility */
  title?: string;
  overrides?: OverridesT;
} & StyledComponentArgsT;
