/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { ThemeT } from '../styles/types';
import type { OverrideT } from '../helpers/overrides';

export type BaseProviderPropsT = {
  /** Children element to be rendered. Normally the BaseProvider
   should be added at the top level of an application. */
  children: React.ReactNode | undefined | null;
  overrides?: {
    AppContainer?: OverrideT;
    LayersContainer?: OverrideT;
  };
  /** The base theme to be used in the application. */
  theme: ThemeT;
  /** A value of z-index to be set on the layers. */
  zIndex?: number;
};
