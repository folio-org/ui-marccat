import React from 'react';
import { TextField } from '@folio/stripes/components';
import { Field } from 'redux-form';

export default ({ name, label, onChange, ...props }) => {
  return (
    <Field
      {...props}
      id={name}
      name={name}
      component={TextField}
      label={label}
      onChange={onChange}
    />
  );
};
