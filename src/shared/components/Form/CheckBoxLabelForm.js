// @flow
import * as React from 'react';
import { reduxForm } from 'redux-form';
import CheckboxLabelField from './CheckBoxLabelField';

import type { Props } from '../../../flow/types.js.flow';

// eslint-disable-next-line no-unused-vars
import style from '../Style/InputField.css';
import { REDUX } from '../../../config/constants';

type P = Props & {
  labels: Array<*>,
};


function CheckBoxLabelForm(props: P) {
  const { labels } = props;
  return (
    <form name={REDUX.FORM.CHECKBOX_FORM}>
      { labels.map((label, idx) => (
        <CheckboxLabelField key={idx} l={label} labels={labels} {...props} />
      ))}
    </form>
  );
}

export default reduxForm({
  form: REDUX.FORM.CHECKBOX_FORM,
  navigationCheck: true,
  enableReinitialize: true,
  destroyOnUnmount: false
})(CheckBoxLabelForm);
