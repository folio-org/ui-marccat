// @flow
import * as React from 'react';
import { Select } from '@folio/stripes/components';
import { Field } from 'redux-form';
/**
 *
 *
 * @export
 * @param {Props} { dataOptions, placeholder, onChange, name, label, ...props }
 * @returns {React.ComponentType<Props, State>}
 */
export default function SelectField({ dataOptions, placeholder, onChange, name, label, ...props }) {
  return (
    <Field
      {...props}
      id={name}
      name={name}
      label={label}
      dataOptions={dataOptions}
      component={Select}
      onChange={onChange}
      placeholder={placeholder || label}
    />
  );
}
