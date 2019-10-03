// @flow
import * as React from 'react';
import { reduxForm, Field } from 'redux-form';
import type { Props } from '../../../flow/types.js.flow';

function CheckMarkIcon({ ...props }: Props) {
  const { labels, pullLeft, dispatch, change, widthPadding } = props;
  dispatch(change('checkmark-NEW Template-0', 'checked'));
  return (
    <div>
      { labels.map((l, i) => (
        <div
          key={i}
          style={
            {
              float: (pullLeft) ? 'left' : 'none',
              paddingBottom: (widthPadding) ? '10px' : 'none'
            }
          }
        >
          <Field
            id={`checkmark-${l}-${i}`}
            className="checkbox"
            name={`checkmark-${l}-${i}`}
            type="checkbox"
            component="input"
          />
          <label
            htmlFor={`checkmark-${l}-${i}`}
            className="checkbox-noborder"
            onClick={() => {
              dispatch(change('checkMarkForm', 'checked', true));
            }}
          >
            {l}
          </label>
        </div>
      ))
      }
    </div>
  );
}

export default reduxForm({
  form: 'checkMarkForm',
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false
})(CheckMarkIcon);
