/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { ThemeProvider, LightTheme } from '../../index';
import { StyledLink } from '../../link/index';
import { Breadcrumbs } from '../index';
import { IconPropsT } from '../../icon';

const XSmallFilled = ({ title, size, color, ...props }: IconPropsT) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <title>{title}</title>
      <path
        d="M18.1 8.1l-2.2-2.2-3.9 4-3.9-4-2.2 2.2 4 3.9-4 3.9 2.2 2.2 3.9-4 3.9 4 2.2-2.2-4-3.9 4-3.9z"
        fill={color}
      />
    </svg>
  );
};

export function Scenario() {
  return (
    <ThemeProvider
      theme={{
        ...LightTheme,
        icons: {
          ChevronLeft: (p) => <XSmallFilled {...p} color="pink" />,
          ChevronRight: (p) => <XSmallFilled {...p} color="green" />,
        },
      }}
    >
      <Breadcrumbs>
        <StyledLink href="#">Parent Page</StyledLink>
        <StyledLink href="#">Sub-Parent Page</StyledLink>
        <span>Current Page</span>
      </Breadcrumbs>
    </ThemeProvider>
  );
}
