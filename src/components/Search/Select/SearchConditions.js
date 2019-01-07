
/**
 * @format
 * @flow
 */
import React from 'react';
import { Field } from 'redux-form';
import { Select } from '@folio/stripes/components';

export default function SearchConditions({ ...props }) {
  const { rest, idx } = props;
  const options = [
    { label: 'Browse', value: 'BROWSE' },
    { label: 'Begins with', value: 'START' },
    { label: 'Contains', value: 'CONTAINS' },
    { label: 'Exact match', value: 'MATCH' }
  ];
  return (
    <Field
      name={`selectCondition${idx}`}
      id={`selectCondition${idx}`}
      placeholder="Select condition..."
      component={Select}
      dataOptions={options}
      {...rest}
    />
  );
}
