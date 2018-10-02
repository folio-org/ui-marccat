
/**
 * @format
 * @flow
 */
import React from 'react';
import Select from '@folio/stripes-components/lib/Select';
import { Props } from '../Core';

type P = Props & {
  label: string;
  value: number;
};

export default function SearchConditions({ label }:P) {
  const options = [
    { label: 'Start with', value: '0' },
    { label: 'Contains', value: '1' },
    { label: 'Does not contain', value: '2' },
    { label: 'Exact match', value: '3' },
  ];
  return (
    <Select
      label={label}
      dataOptions={options}
    />
  );
}
