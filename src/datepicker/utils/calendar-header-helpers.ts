/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { DEFAULT_MONTHS } from '../constants';

export type OptionT = {
  id: string;
  label: string;
  disabled?: boolean;
};

type GetMonthItemsArgsT = {
  filterMonthsList: number[] | null;
  formatMonthLabel: (a: number) => string;
};

const getDefaultMonthItems = (formatMonthLabel: (a: number) => string) =>
  DEFAULT_MONTHS.map<OptionT>((month) => ({
    id: month.toString(),
    label: formatMonthLabel(month),
  }));

export const filterMonthItems = (monthItems: OptionT[], filterList: number[]) =>
  monthItems.map<OptionT>((month) => {
    if (!filterList.includes(Number(month.id))) {
      return {
        ...month,
        disabled: true,
      };
    }
    return month;
  });

export const getFilteredMonthItems = ({
  filterMonthsList,
  formatMonthLabel,
}: GetMonthItemsArgsT) => {
  let monthItems = getDefaultMonthItems(formatMonthLabel);

  if (filterMonthsList) {
    monthItems = filterMonthItems(monthItems, filterMonthsList);
  }

  return monthItems;
};
