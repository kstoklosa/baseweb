/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { StyledGrid, StyledCell } from './styled-components';
import Grid from './grid';
import Cell from './cell';

import DeprecatedHOC from '../utils/deprecated-component';

export { StyledGrid, StyledCell, Grid, Cell };
export * from './constants';

const componentName = 'Layout Grid (baseui/layout-grid)';
export const Unstable_StyledGrid = DeprecatedHOC(StyledGrid, componentName);
export const Unstable_StyledCell = DeprecatedHOC(StyledCell, componentName);
export const Unstable_Grid = DeprecatedHOC(Grid, componentName);
export const Unstable_Cell = DeprecatedHOC(Cell, componentName);

export * from './types';
