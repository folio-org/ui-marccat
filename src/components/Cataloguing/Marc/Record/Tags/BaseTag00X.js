// @flow
import * as React from 'react';
import { MarcField } from '../..';
import style from '../../../Style/index.css';

export default ({ fixedfields, ...props }) => (
  <React.Fragment>
    {fixedfields.map(field => (
      <div className={style.fieldContainer}>
        <MarcField
          {...props}
          readOnly="true"
          label={field.fixedField.code}
          name={field.fixedField.code}
          value={field.fixedField.displayValue}
        />
      </div>
    ))
    }
  </React.Fragment>
);
