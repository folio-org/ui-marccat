// @flow
import * as React from 'react';
import { Field } from 'redux-form';
import { EMPTY_STRING } from '../../../config/constants';

export default (props) => {
  const initialState = { value: false };
  const [state, setState] = React.useState(initialState);
  const { label, nolabel, style, rowIndex } = props;
  return (
    <React.Fragment>
      <Field
        id={`checkbox-${label}`}
        className="checkbox"
        name={`checkbox-${label}`}
        aria-label={state.value}
        type="checkbox"
        component="input"
        value={state.value}
      />
      <label
        aria-rowindex={rowIndex}
        style={style || {}}
        htmlFor={`checkbox-${label}`}
        className="checkbox"
        onClick={() => {
          setState(!state.value);
        }}
      >
        {(!nolabel) ? label : EMPTY_STRING}
      </label>
    </React.Fragment>
  );
};
