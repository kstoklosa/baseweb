/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import type { AvatarStylePropsT, RootStylePropsT, InitialsStylePropsT } from './types';

function getSize(props) {
  const { $size, $theme } = props;

  const defaultSize = $theme.sizing.scale1000;
  const size = $size || defaultSize;
  return $theme.sizing[size] || size;
}

export const Avatar = styled<'img', AvatarStylePropsT>('img', (props) => {
  const themedSize = getSize(props);

  return {
    borderTopLeftRadius: '50%',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    borderBottomLeftRadius: '50%',
    boxSizing: 'border-box',
    display: props.$imageLoaded ? 'block' : 'none',
    height: themedSize,
    width: themedSize,
    objectFit: 'cover',
  };
});

export const Initials = styled<'div', InitialsStylePropsT>('div', (props) => ({
  ...props.$theme.typography.font300,
  color: props.$theme.colors.mono100,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
}));

export const Root = styled<'div', RootStylePropsT>('div', (props) => {
  const { $didImageFailToLoad } = props;
  const themedSize = getSize(props);

  return {
    backgroundColor: $didImageFailToLoad ? props.$theme.colors.primary : null,
    borderTopLeftRadius: '50%',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    borderBottomLeftRadius: '50%',
    boxSizing: 'border-box',
    display: 'inline-block',

    // image previously set the root height/width
    // since image is not rendered, set the height/width
    height: $didImageFailToLoad ? themedSize : null,
    width: $didImageFailToLoad ? themedSize : null,
  };
});
