/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import type { OverrideT } from '../helpers/overrides';

import { DURATION, PLACEMENT } from './constants';

import type { SyntheticEvent } from 'react';

export type DurationT =
  | typeof DURATION.infinite
  | typeof DURATION.short
  | typeof DURATION.medium
  | typeof DURATION.long;

export type PlacementT =
  | typeof PLACEMENT.topLeft
  | typeof PLACEMENT.top
  | typeof PLACEMENT.topRight
  | typeof PLACEMENT.bottomLeft
  | typeof PLACEMENT.bottom
  | typeof PLACEMENT.bottomRight;

export type SnackbarElementOverridesT = {
  Root?: OverrideT;
  Content?: OverrideT;
  StartEnhancerContainer?: OverrideT;
  Spinner?: OverrideT;
  Message?: OverrideT;
  WrapActionButtonContainer?: OverrideT;
  ActionButtonContainer?: OverrideT;
};

export type SnackbarElementPropsT = {
  // message displayed in button
  actionMessage?: string;
  // function executed on button click
  actionOnClick?: (a: SyntheticEvent<HTMLButtonElement>) => unknown;
  // if action button preset focus it, defaults to true
  focus?: boolean;
  // primary message displayed in snackbar
  message: React.ReactNode;
  overrides?: SnackbarElementOverridesT;
  // renders spinner in start enhancer position
  progress?: boolean;
  // renders element as message prefix, takes precedence over progress prop
  startEnhancer?: React.ComponentType<{
    size: number;
  }>;
};

export type SnackbarProviderPropsT = {
  children?: React.ReactNode;
  overrides?: {
    PlacementContainer?: OverrideT;
  } & SnackbarElementOverridesT;
  // location on page where snackbar will render
  placement?: PlacementT;
  // default display duration
  defaultDuration?: DurationT;
};
