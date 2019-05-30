// @flow
import * as React from 'react';
import { Field } from 'redux-form';
import { EMPTY_STRING } from '../../../config/constants';

export default function CheckBoxLabelField(props) {
  const { label, nolabel, change, style } = props;
  let value = true;
  return (
    <React.Fragment>
      <Field
        id={`checkbox-${label}`}
        className="checkbox"
        name={`checkbox-${label}`}
        type="checkbox"
        component="input"
      />
      <label
        style={style || {}}
        htmlFor={`checkbox-${label}`}
        className="checkbox"
        onClick={() => {
          value = !value;
          change(`checkbox-${label}`, value);
        }}
      >
        {(!nolabel) ? label : EMPTY_STRING}
      </label>
    </React.Fragment>
  );
}
