import React from 'react';
import MarcField from '../../MarcField';
import style from '../../../Style/index.css';

export default ({ ...props }) => {
  const { tag, readOnly, withIcon } = props;
  return (
    <div className={style.controlFieldContainer}>
      <MarcField
        {...props}
        withIcon={withIcon || false}
        readOnly={readOnly}
        label={tag.fixedField.code}
        name={tag.fixedField.code}
        value={tag.fixedField.displayValue}
      />
    </div>
  );
};
