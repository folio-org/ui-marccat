// @flow
import * as React from 'react';
import { Field as FormField } from '../Common/Field';
import style from '../Style/index.css';

const FixedField = ({ fixedfields, ...props }) => (
  <React.Fragment>
    {fixedfields.map(field => (
      <div className={style.fieldContainer}>
        <FormField
          {...props}
          readOnly={true.toString()}
          label={field.fixedField.code}
          name={field.fixedField.code}
        />
      </div>
    ))
    }
  </React.Fragment>
);
export default (FixedField);
