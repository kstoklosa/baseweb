/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, getByText, queryByText } from '@testing-library/react';

import { Table } from '..';

const COLUMNS = ['ID', 'First Name', 'Last Name', 'Age', 'Address'];

const DATA = [
  ['1', 'Sarah', 'Brown', 31, '100 Broadway st. New York City, New York'],
  ['2', 'Jane', 'Smith', 32, '100 Market st. San Francisco, California'],
  ['3', 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
];

describe('Table Semantic', () => {
  it('renders expected number of rows', () => {
    const { container } = render(<Table columns={COLUMNS} data={DATA} />);
    const rows = container.querySelectorAll('tr');
    expect(rows.length).toBe(DATA.length + 1);
  });

  it('renders expected number of columns', () => {
    const { container } = render(<Table columns={COLUMNS} data={DATA} />);
    const headCells = container.querySelectorAll('th');
    expect(headCells.length).toBe(DATA[0].length);
  });

  it('exposes row and column data to overrides', () => {
    const mockTableHeadCellStyle = jest.fn((arg) => null);
    const mockTableBodyRowStyle = jest.fn((arg) => null);
    const mockTableBodyCellStyle = jest.fn((arg) => null);

    render(
      <Table
        columns={COLUMNS}
        data={DATA}
        overrides={{
          TableHeadCell: {
            style: mockTableHeadCellStyle,
          },
          TableBodyRow: {
            style: mockTableBodyRowStyle,
          },
          TableBodyCell: {
            style: mockTableBodyCellStyle,
          },
        }}
      />
    );

    expect(mockTableHeadCellStyle.mock.calls.length).toBe(5);
    expect(mockTableHeadCellStyle.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        $colIndex: 0,
        $col: 'ID',
      })
    );

    expect(mockTableBodyRowStyle.mock.calls.length).toBe(3);
    expect(mockTableBodyRowStyle.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        $rowIndex: 0,
        $row: DATA[0],
      })
    );

    expect(mockTableBodyCellStyle.mock.calls.length).toBe(15);
    expect(mockTableBodyCellStyle.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        $colIndex: 0,
        $col: 'ID',
        $rowIndex: 0,
        $row: DATA[0],
      })
    );
  });

  it('renders loading message', () => {
    const { container } = render(<Table columns={COLUMNS} data={DATA} isLoading={true} />);
    getByText(container, 'Loading...');
  });

  it('renders empty message', () => {
    const { container } = render(<Table columns={COLUMNS} data={[]} emptyMessage="No data" />);
    getByText(container, 'No data');
  });

  it('does not render unset empty message', () => {
    const { container } = render(<Table columns={COLUMNS} data={[]} />);
    expect(queryByText(container, 'Loading...')).toBeNull();
  });
});
