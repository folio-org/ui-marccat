// @flow
import * as React from 'react';
import { Select } from '@folio/stripes/components';
import { Field } from 'redux-form';
import type { Props, State } from '../../../../../flow/types.js.flow';

export default ({ dataOptions, onChange, name, label, ...props }: Props): React.ComponentType<Props, State> => (
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
