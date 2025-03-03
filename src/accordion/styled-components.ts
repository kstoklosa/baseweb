/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { getSvgStyles } from '../icon/styled-components';
import type { SharedStylePropsArgT } from './types';

/**
 * Main component container element
 */
export const Root = styled('ul', {
  listStyleType: 'none',
  marginBottom: 0,
  marginTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
  width: '100%',
});

export const PanelContainer = styled<'li', SharedStylePropsArgT>('li', (props) => {
  const {
    $expanded,
    $theme: { colors },
  } = props;
  return {
    listStyleType: 'none',
    width: '100%',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: $expanded ? colors.mono500 : colors.mono400,
  };
});

export const Header = styled<'div', SharedStylePropsArgT>('div', (props) => {
  const {
    $disabled,
    $isFocusVisible,
    $theme: { colors, sizing, typography },
  } = props;
  return {
    ...typography.font350,
    color: colors.contentPrimary,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    backgroundColor: colors.listHeaderFill,
    paddingTop: sizing.scale600,
    paddingBottom: sizing.scale600,
    paddingLeft: sizing.scale700,
    paddingRight: sizing.scale700,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    display: 'flex',
    alignItems: 'center',
    outline: $isFocusVisible ? `3px solid ${colors.accent}` : 'none',
    outlineOffset: '-3px',
    justifyContent: 'space-between',
    ':hover': {
      color: colors.primary,
    },
  };
});

export const ToggleIcon = styled<'svg', SharedStylePropsArgT>('svg', (props) => {
  const { $theme, $disabled, $color } = props;
  return {
    ...getSvgStyles(props),
    flexShrink: 0,
    color: $color || $theme.colors.contentPrimary,
    cursor: $disabled ? 'not-allowed' : 'pointer',
  };
});

export const ToggleIconGroup = styled<'g', SharedStylePropsArgT>('g', (props) => {
  const { $theme, $expanded } = props;
  return {
    transform: $expanded ? 'rotate(0)' : 'rotate(-90deg)',
    transformOrigin: 'center',
    transitionProperty: 'transform',
    transitionDuration: $theme.animation.timing500,
    transitionTimingFunction: $theme.animation.easeOutQuinticCurve,
  };
});

export const Content = styled<'div', SharedStylePropsArgT>('div', (props) => {
  const {
    $theme: { animation, colors, sizing, typography },
    $expanded,
  } = props;
  return {
    ...typography.font200,
    backgroundColor: colors.listBodyFill,
    color: colors.contentPrimary,
    paddingTop: sizing.scale800,
    paddingBottom: sizing.scale1000,
    paddingLeft: sizing.scale800,
    paddingRight: sizing.scale800,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    boxSizing: 'border-box',
    overflow: 'hidden',
    opacity: $expanded ? 1 : 0,
    visibility: $expanded ? 'visible' : 'hidden',
    transitionProperty: 'opacity,visibility',
    transitionDuration: animation.timing500,
    transitionDelay: animation.timing200,
    transitionTimingFunction: animation.easeOutQuinticCurve,
  };
});

export const ContentAnimationContainer = styled<
  'div',
  {
    $height: string | number;
  } & SharedStylePropsArgT
>('div', (props) => {
  const {
    $height,
    $theme: { animation },
  } = props;
  return {
    height: `${$height}`,
    overflow: 'hidden',
    transitionProperty: 'height',
    transitionDuration: animation.timing500,
    transitionTimingFunction: animation.easeOutQuinticCurve,
  };
});
