/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { colors } from '../../tokens';
import type { ColorTokensT } from '../types';

// color constants
const lightColorTokens: ColorTokensT = {
  // Primary Palette
  primaryA: colors.black,
  primaryB: colors.white,
  primary: colors.black,
  primary50: colors.gray50,
  primary100: colors.gray100,
  primary200: colors.gray200,
  primary300: colors.gray300,
  primary400: colors.gray400,
  primary500: colors.gray500,
  primary600: colors.gray600,
  primary700: colors.gray700,
  // Accent Palette
  accent: colors.blue400,
  accent50: colors.blue50,
  accent100: colors.blue100,
  accent200: colors.blue200,
  accent300: colors.blue300,
  accent400: colors.blue400,
  accent500: colors.blue500,
  accent600: colors.blue600,
  accent700: colors.blue700,
  // Negative Palette
  negative: colors.red400,
  negative50: colors.red50,
  negative100: colors.red100,
  negative200: colors.red200,
  negative300: colors.red300,
  negative400: colors.red400,
  negative500: colors.red500,
  negative600: colors.red600,
  negative700: colors.red700,
  // Warning Palette
  warning: colors.yellow400,
  warning50: colors.yellow50,
  warning100: colors.yellow100,
  warning200: colors.yellow200,
  warning300: colors.yellow300,
  warning400: colors.yellow400,
  warning500: colors.yellow500,
  warning600: colors.yellow600,
  warning700: colors.yellow700,
  // Positive Palette
  positive: colors.green500,
  positive50: colors.green50,
  positive100: colors.green100,
  positive200: colors.green200,
  positive300: colors.green300,
  positive400: colors.green400,
  positive500: colors.green500,
  positive600: colors.green600,
  positive700: colors.green700,
  // Monochrome Palette
  white: colors.white,
  black: colors.black,
  mono100: colors.white,
  mono200: colors.gray50,
  mono300: colors.gray100,
  mono400: colors.gray200,
  mono500: colors.gray300,
  mono600: colors.gray400,
  mono700: colors.gray500,
  mono800: colors.gray600,
  mono900: colors.gray700,
  mono1000: colors.black,
  // Rating Palette,
  ratingInactiveFill: colors.gray100,
  ratingStroke: colors.gray300,
};

export default lightColorTokens;
