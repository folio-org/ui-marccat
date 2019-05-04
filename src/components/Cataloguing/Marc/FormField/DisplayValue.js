// @flow
import * as React from 'react';
import { Select } from '@folio/stripes/components';
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


export default () => {

  const RenderField = () => (
    <Select
      id={name}
      label={decamelizify(name, EMPTY_SPACED_STRING)}
      dataOptions={values}
      onChange={onChange}
      placeholder={name}
      value={value}
      {...rest}
    />
  );

  return (
    <Field name="" component={RenderField} />
  );
};
