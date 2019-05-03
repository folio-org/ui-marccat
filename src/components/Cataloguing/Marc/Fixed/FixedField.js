// @flow
import * as React from 'react';
import SingleTag00X from './Tags/SingleTag00X';

export default ({ ...props }) => {

  const { fixedfields } = props;
  return (
    <div>
      {fixedfields.map((f, idx) => <SingleTag00X
        {...props}
        key={idx}
        readOnly
        tag={f}
        label={f.fixedField.code}
        name={f.fixedField.code}
        value={f.fixedField.displayValue}
      />)}
    </div>
  );
};
