
/**
 * @format
 * @flow
 */
import React from 'react';
import { Field } from 'redux-form';
import Select from '@folio/stripes-components/lib/Select';

export default function SearchConditions({ ...props }) {
  const options = [
    { label: 'Browse', value: 'BROWSE' },
    { label: 'Start with', value: 'START' },
    { label: 'Contains', value: 'CONTAINS' },
    { label: 'Exact match', value: 'MATCH' }
  ];
  return (
    <Field
      name="selectCondition"
      id="selectCondition"
      placeholder="Select condition..."
      component={Select}
      dataOptions={options}
      {...props.rest}
    />
  );
}
