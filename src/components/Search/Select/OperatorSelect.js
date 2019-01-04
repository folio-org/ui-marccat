import React from 'react';
import { Field } from 'redux-form';
import { Select } from '@folio/stripes/components';

import style from '../index.css';

export default function OperatorSelect({ ...props }) {
  const { rest } = props;
  const options = [
    { label: 'AND', value: 'AND' },
    { label: 'OR', value: 'OR' },
  ];
  return (
    <div className={style.mt16}>
      <Field
        {...rest}
        name="operatorSelect"
        id="operatorSelect"
        placeholder="AND/OR"
        component={Select}
        dataOptions={options}
        marginBottom0
        fullWidth
      />
    </div>
  );
}
