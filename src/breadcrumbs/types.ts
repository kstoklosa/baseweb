/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type { ReactNode } from 'react';

import type { OverrideT } from '../helpers/overrides';

export type OverridesT = {
  Root?: OverrideT;
  Separator?: OverrideT;
  List?: OverrideT;
  ListItem?: OverrideT;
  Icon?: OverrideT;
};

export type BreadcrumbsPropsT = {
  children?: ReactNode;
  overrides?: OverridesT;
  ariaLabel?: string;
  'aria-label'?: string;
  /** Whether to show a trailing separator after the last breadcrumb. */
  showTrailingSeparator?: boolean;
};
