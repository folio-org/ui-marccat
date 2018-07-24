import React from 'react';
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
