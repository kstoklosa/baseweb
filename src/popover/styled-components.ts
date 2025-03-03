/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { ARROW_SIZE, ARROW_WIDTH } from './constants';
import {
  getPopoverMarginStyles,
  getArrowPositionStyles,
  getStartPosition,
  getEndPosition,
} from './utils';
import type { ArrowStylePropsArgT, BodyStylePropsArgT, InnerStylePropsArgT } from './types';
import type { ThemeT } from '../styles/types';
import type { StyleObject } from 'styletron-standard';

/**
 * Main popover container element that gets positioned next to the anchor
 */
export function getBodyStyles(
  props: BodyStylePropsArgT & {
    $theme: ThemeT;
  }
): StyleObject {
  const {
    $animationDuration,
    $isOpen,
    $isAnimating,
    $placement,
    $popoverOffset,
    $showArrow,
    $theme,
    $popoverMargin,
    $isHoverTrigger,
  } = props;

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: $theme.colors.backgroundTertiary,
    borderTopLeftRadius: $theme.borders.popoverBorderRadius,
    borderTopRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomLeftRadius: $theme.borders.popoverBorderRadius,
    boxShadow: $theme.lighting.shadow600,
    transitionProperty: 'opacity,transform',
    transitionDuration: $isAnimating ? ($isOpen ? '0.1s' : `${$animationDuration}ms`) : '0s',
    transitionTimingFunction: $isOpen
      ? $theme.animation.easeOutCurve
      : $theme.animation.easeInCurve,
    opacity: $isAnimating && $isOpen ? 1 : 0,
    transform:
      $isAnimating && $isOpen
        ? getEndPosition($popoverOffset)
        : getStartPosition($popoverOffset, $placement, $showArrow ? ARROW_SIZE : 0, $popoverMargin),
    ...getPopoverMarginStyles($showArrow ? ARROW_SIZE : 0, $placement, $popoverMargin),
    ...($isHoverTrigger
      ? {
          animationDuration: '.1s',
          animationName: {
            '0%': { pointerEvents: 'none' },
            '99%': { pointerEvents: 'none' },
            '100%': { pointerEvents: 'auto' },
          },
        }
      : {}),
  };
}

export const Body = styled<'div', BodyStylePropsArgT>('div', getBodyStyles);

/**
 * Arrow shown between the popover and the anchor element
 */
export function getArrowStyles(
  props: ArrowStylePropsArgT & {
    $theme: ThemeT;
  }
): StyleObject {
  const { $arrowOffset, $placement, $theme } = props;
  return {
    backgroundColor: $theme.colors.backgroundTertiary,
    boxShadow: $theme.lighting.shadow600,
    width: `${ARROW_WIDTH}px`,
    height: `${ARROW_WIDTH}px`,
    transform: 'rotate(45deg)',
    position: 'absolute',
    ...getArrowPositionStyles($arrowOffset, $placement),
  };
}

export const Arrow = styled<'div', ArrowStylePropsArgT>('div', getArrowStyles);

/**
 * Extra div that holds the popover content. This extra element
 * is needed for the arrow–the arrow is just a 45deg rotated div,
 * and rendering this extra element on top with a solid background
 * clips the part of the arrow that extends into the popover.
 */
export function getInnerStyles({ $theme }: { $theme: ThemeT }): StyleObject {
  return {
    backgroundColor: $theme.colors.backgroundTertiary,
    borderTopLeftRadius: $theme.borders.popoverBorderRadius,
    borderTopRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomLeftRadius: $theme.borders.popoverBorderRadius,
    color: $theme.colors.contentPrimary,
    position: 'relative',
  };
}

export const Inner = styled<'div', InnerStylePropsArgT>('div', getInnerStyles);

/**
 * A drop-in component that provides the recommended padding
 * for popovers. Mostly a convenience for users so they don't
 * have to define this themselves.
 */
export const Padding = styled('div', {
  paddingLeft: '12px',
  paddingTop: '12px',
  paddingRight: '12px',
  paddingBottom: '12px',
});

export const Hidden = styled('div', {
  display: 'none',
});
