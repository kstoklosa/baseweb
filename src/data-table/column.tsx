/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Checkbox } from '../checkbox';
import { useStyletron } from '../styles';

import type { ColumnT } from './types';

function Column<ValueT, FilterParamsT>(
  options: ColumnT<ValueT, FilterParamsT>
): ColumnT<ValueT, FilterParamsT> {
  return {
    kind: options.kind,
    buildFilter: options.buildFilter || (() => () => true),
    textQueryFilter: options.textQueryFilter,
    fillWidth: options.fillWidth === undefined ? true : options.fillWidth,
    filterable:
      Boolean(options.filterable) && Boolean(options.renderFilter) && Boolean(options.buildFilter),
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    // todo(flow->ts) add proper type annotation
    // eslint-disable-next-line react/display-name
    renderCell: React.forwardRef((props, ref: any) => {
      const [css, theme] = useStyletron();
      const ProvidedCell = options.renderCell;

      let cellBlockAlign = 'flex-start';
      if (options.cellBlockAlign === 'center') {
        cellBlockAlign = 'center';
      } else if (options.cellBlockAlign === 'end') {
        cellBlockAlign = 'flex-end';
      }

      return (
        <div
          ref={ref}
          className={css({
            ...theme.typography.font100,
            boxSizing: 'border-box',
            color: theme.colors.contentPrimary,
            display: props.isMeasured ? 'inline-block' : null,
            height: '100%',
            paddingTop: theme.sizing.scale300,
            paddingLeft: theme.sizing.scale500,
            paddingBottom: theme.sizing.scale300,
            paddingRight: theme.sizing.scale500,
            width: props.isMeasured ? null : '100%',
          })}
        >
          <div
            className={css({
              alignItems: cellBlockAlign,
              display: 'flex',
              height: '100%',
            })}
          >
            {Boolean(props.onSelect) && (
              <span className={css({ paddingRight: theme.sizing.scale300 })}>
                <Checkbox
                  onChange={props.onSelect}
                  checked={props.isSelected}
                  overrides={{
                    Checkmark: { style: { marginTop: null, marginBottom: null } },
                  }}
                />
              </span>
            )}
            <ProvidedCell {...props} />
          </div>
        </div>
      );
    }),
    renderFilter: options.renderFilter || (() => null),
    sortable: Boolean(options.sortable) && Boolean(options.sortFn),
    sortFn: options.sortFn || (() => 0),
    title: options.title,
  };
}

export default Column;
