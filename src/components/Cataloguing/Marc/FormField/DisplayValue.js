// @flow
import * as React from 'react';
import { Select } from '@folio/stripes/components';
import formField from '@folio/stripes-components/lib/FormField';
import { decamelizify } from '../../../../utils/Function';
import { EMPTY_SPACED_STRING } from '../../../../config/constants';

const DisplayValue = ({ name, value, onChange, values, ...rest }) => (
  <React.Fragment>
    <Select
      id={name}
      label={decamelizify(name, EMPTY_SPACED_STRING)}
      dataOptions={values}
      onChange={onChange}
      placeholder={name}
      value={value}
      {...rest}
    />
  </React.Fragment>
);

export default formField(
  DisplayValue,
  ({ meta, input, ...props }) => ({
    code: props.code,
    values: input.field.dropdownSelect || {},
    name: input.field.name,
    dirty: meta.dirty,
    error: (meta.touched && meta.error ? meta.error : '')
  })
);
