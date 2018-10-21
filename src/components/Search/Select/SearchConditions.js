
/**
 * @format
 * @flow
 */
import React from 'react';
import { Field } from 'redux-form';
import Selection from '@folio/stripes-components/lib/Selection';

export default function SearchConditions() {
  const options = [
    { label: 'Start with', value: 'AW' },
    { label: 'Contains', value: 'AW' },
    { label: 'Does not contain', value: 'AW' },
    { label: 'Exact match', value: 'AW' },
  ];
  return (
    <Field
      name="selectCondition"
      id="selectCondition"
      placeholder="Select condition..."
      component={Selection}
      dataOptions={options}
    />
  );
}
