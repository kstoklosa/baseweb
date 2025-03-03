/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { SIZE } from './constants';
import {
  StyledRoot,
  StyledBarContainer,
  StyledBar,
  StyledLabel,
  StyledBarProgress,
  StyledInfiniteBar,
} from './styled-components';

import type { ProgressBarPropsT } from './types';

class ProgressBar extends React.Component<
  ProgressBarPropsT & {
    forwardedRef: any;
  }
> {
  static defaultProps = {
    getProgressLabel: (value: number, maxValue: number, minValue: number) =>
      `${Math.round(((value - minValue) / (maxValue - minValue)) * 100)}% Loaded`,
    infinite: false,
    overrides: {},
    showLabel: false,
    size: SIZE.medium,
    steps: 1,
    successValue: 100,
    minValue: 0,
    maxValue: 100,
    value: 0,
  };

  componentDidMount() {
    // TODO(v11): remove warning when switching default Spinner
    if (__DEV__) {
      if (this.props.errorMessage) {
        console.warn('baseui:ProgressBar The `errorMessage` prop is deprecated in WAI-ARIA v1.2.');
      }
    }
  }

  render() {
    const {
      overrides = {},
      getProgressLabel,
      value,
      size,
      steps,
      successValue,
      minValue,
      maxValue,
      showLabel,
      infinite,
      errorMessage,
      forwardedRef,
      ...restProps
    } = this.props;
    const ariaLabel = this.props['aria-label'] || this.props.ariaLabel;
    // fallback on successValue (and it's default) if maxValue is not set by user
    const maximumValue = maxValue !== 100 ? maxValue : successValue;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [BarContainer, barContainerProps] = getOverrides(
      overrides.BarContainer,
      StyledBarContainer
    );
    const [Bar, barProps] = getOverrides(overrides.Bar, StyledBar);
    const [BarProgress, barProgressProps] = getOverrides(overrides.BarProgress, StyledBarProgress);
    const [Label, labelProps] = getOverrides(overrides.Label, StyledLabel);
    const [InfiniteBar, infiniteBarProps] = getOverrides(overrides.InfiniteBar, StyledInfiniteBar);
    const sharedProps = {
      $infinite: infinite,
      $size: size,
      $steps: steps,
      $successValue: maximumValue,
      $minValue: minValue,
      $maxValue: maximumValue,
      $value: value,
    };
    function renderProgressBar() {
      const children = [];
      for (let i = 0; i < steps; i++) {
        children.push(
          <Bar key={i} {...sharedProps} {...barProps}>
            <BarProgress $index={i} {...sharedProps} {...barProgressProps} />
          </Bar>
        );
      }
      return children;
    }
    return (
      // eslint-disable-next-line jsx-a11y/role-supports-aria-props
      <Root
        ref={forwardedRef}
        data-baseweb="progress-bar"
        role="progressbar"
        aria-label={ariaLabel || getProgressLabel(value, maximumValue, minValue)}
        aria-valuenow={infinite ? null : value}
        aria-valuemin={infinite ? null : minValue}
        aria-valuemax={infinite ? null : maximumValue}
        aria-invalid={errorMessage ? true : null}
        aria-errormessage={errorMessage}
        {...restProps}
        {...sharedProps}
        {...rootProps}
      >
        <BarContainer {...sharedProps} {...barContainerProps}>
          {infinite ? (
            <React.Fragment>
              <InfiniteBar $isLeft={true} $size={sharedProps.$size} {...infiniteBarProps} />
              <InfiniteBar $size={sharedProps.$size} {...infiniteBarProps} />
            </React.Fragment>
          ) : (
            renderProgressBar()
          )}
        </BarContainer>
        {showLabel && (
          <Label {...sharedProps} {...labelProps}>
            {getProgressLabel(value, maximumValue, minValue)}
          </Label>
        )}
      </Root>
    );
  }
}

const ForwardedProgressBar = React.forwardRef<HTMLDivElement, Partial<ProgressBarPropsT>>(
  (props: ProgressBarPropsT, ref) => (
    //$FlowExpectedError[cannot-spread-inexact]
    <ProgressBar forwardedRef={ref} {...props} />
  )
);
ForwardedProgressBar.displayName = 'ProgressBar';
export default ForwardedProgressBar;
