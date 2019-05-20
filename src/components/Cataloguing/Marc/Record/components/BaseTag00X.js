// @flow
import * as React from 'react';
import { MarcField } from '../../Form/FixedField/Field';
import style from '../../../Style/index.css';

const BaseTag00X = ({ fixedfields, ...props }) => (
  <React.Fragment>
    {fixedfields.map(field => (
      <div className={style.fieldContainer}>
        <MarcField
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
export default (BaseTag00X);
