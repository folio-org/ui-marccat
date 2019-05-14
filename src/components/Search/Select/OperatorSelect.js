// @flow
import * as React from 'react';
import { Field } from 'redux-form';
import { Select } from '@folio/stripes/components';

import style from '../Style/index.css';

export default ({ ...props }) => {
  const { rest, name, id } = props;
  const options = [
    { label: 'AND', value: 'AND' },
    { label: 'OR', value: 'OR' },
    { label: 'NOT', value: 'NOT' },
  ];
  return (
    <div className={style.mt16}>
      <Field
        {...rest}
        name={name}
        id={id}
        placeholder="AND/OR/NOT"
        component={Select}
        dataOptions={options}
        marginBottom0
        fullWidth
      />
    </div>
  );
};
