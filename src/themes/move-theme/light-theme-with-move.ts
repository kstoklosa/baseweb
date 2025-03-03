/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import deepMerge from '../../utils/deep-merge';
import { LightTheme } from '../light-theme/light-theme';
import { typography as moveTypography, fontTokens as moveFontTokens } from './typography';
import getTypography from '../shared/typography';

import type { ThemeT } from '../../styles/types';

export const LightThemeMove: ThemeT = deepMerge({}, LightTheme, {
  name: 'light-theme-with-move',
  // For the move theme we need to override typography values
  // in the default lightTheme with a font values that reference
  // our custom font family. In addition to it we want to replace some
  // of the fonts with an additional secondary font that specified
  // in `moveTypography`. For it we'll get the typography value built
  // with a custom font using `getTypography` helper and extend the result
  // value with the customized set of fonts that reference a secondary font
  typography: deepMerge(getTypography(moveFontTokens), moveTypography),
});
