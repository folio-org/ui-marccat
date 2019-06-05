
//
import * as React from 'react';
import { Field } from 'redux-form';
import { Select } from '@folio/stripes/components';

export default ({ ...props }) => {
  const { rest, name, id } = props;
  const options = [
    { label: 'Browse', value: 'BROWSE' },
    { label: 'Begins with', value: 'START' },
    { label: 'Contains', value: 'CONTAINS' },
    { label: 'Exact match', value: 'MATCH' }
  ];
  return (
    <Field
      name={name}
      id={id}
      placeholder="Select condition..."
      component={Select}
      marginBottom0
      dataOptions={options}
      {...rest}
    />
  );
};
