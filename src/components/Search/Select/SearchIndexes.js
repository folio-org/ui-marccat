
/**
 * @format
 * @flow
 */
import React from 'react';
import { Selection } from '@folio/stripes-components';
import { Props } from '../../../core';

type P = Props & {
  label: string;
  value: number;
};

export default function SearchIndexes({ label }:P) {
  const options = [
    { label: 'All MARC fields', value: '0' },
    { label: 'Multiple MARC fields [XXX]', value: '1' },
    { label: 'ISBN', value: '2' },
    { label: 'ISSN', value: '3' },
    { label: 'Keyword', value: '4' },
    { label: 'Local Number', value: '5' },
    { label: 'Name', value: '6' },
    { label: 'Publisher', value: '7' },
    { label: 'Self location', value: '8' },
    { label: 'Subject', value: '9' },
    { label: 'Title', value: '10' }
  ];
  return (
    <Selection
      id="selection-first"
      placeholder="Select a field..."
      style={{ marginBottm: '0' }}
      label={label}
      dataOptions={options}
    />
  );
}
