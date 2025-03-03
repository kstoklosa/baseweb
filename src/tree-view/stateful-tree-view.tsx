/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import StatefulContainer from './stateful-container';
import TreeView from './tree-view';
import type { TreeViewPropsT } from './types';

export default function StatefulTreeView(props: TreeViewPropsT) {
  return (
    <StatefulContainer {...props}>
      {(treeViewProps) => <TreeView {...treeViewProps} />}
    </StatefulContainer>
  );
}
