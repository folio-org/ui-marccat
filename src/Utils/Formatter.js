import * as React from 'react';
import _ from 'lodash';
import { FormattedDate, FormattedTime } from 'react-intl';

export function formatDate(dateStr) {
  if (!dateStr) return dateStr;
  return <FormattedDate value={dateStr} />;
}

export function formatDateTime(dateStr) {
  if (!dateStr) return dateStr;
  return (
    <span>
      <FormattedDate value={dateStr} />{' '}
      <FormattedTime value={dateStr} />
    </span>
  );
}

export const formatSearchQuery = (input: string) => {
  const splitted = input.split(';;;');
  const firstPart = `"${splitted[0]}"`;
  const lastPart = `[${splitted[1]}]`;
  return firstPart.concat(' ').concat(lastPart);
};

export const removeById = (array, val) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === val) {
      array.splice(i, 1);
      i--;
    }
  }
  return array;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const fakeFormatter = {
  'Id: id': x => _.get(x, ['id']),
  'name: name': x => _.get(x, ['name']),
};
