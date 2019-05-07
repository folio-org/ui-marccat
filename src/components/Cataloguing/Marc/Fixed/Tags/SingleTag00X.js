// @flow
import * as React from 'react';
import MarcField from '../../MarcField';
import style from '../../../Style/index.css';

export default ({ ...props }) => {
  const { tag, readOnly } = props;
  return (
    <div className={style.fieldContainer}>
      <MarcField
        {...props}
        readOnly={readOnly}
        label={tag.fixedField.code}
        name={tag.fixedField.code}
        value={tag.fixedField.displayValue}
      />
    </div>
  );
};
