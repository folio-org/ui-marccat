//
import * as React from 'react';
import { Select } from '@folio/stripes/components';
import { Field } from 'redux-form';

export default ({ dataOptions, onChange, name, label, ...props }) => (
  <Field
    {...props}
    id={name}
    name={name}
    label={label}
    dataOptions={dataOptions}
    component={Select}
    onChange={onChange}
    placeholder={label}
  />
);
