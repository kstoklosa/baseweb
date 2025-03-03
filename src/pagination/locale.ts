/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export type PaginationLocaleT = {
  prev: string;
  next: string;
  preposition: string;
};

const locale = {
  prev: 'Prev',
  next: 'Next',
  preposition: 'of',
};

export default locale;
