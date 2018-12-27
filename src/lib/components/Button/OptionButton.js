/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import style from '../../Style/InputField.css';

type Props = {
  labels: Array<any>,
};

export function RadioIconButton({ ...props }:Props) {
  const { labels } = props;
  return (
    <form>
      { React.Children.map(labels, (l, i) => (
        <div key={i}>
          <input id={`radio-${i}`} className={style['radio-custom']} name={`radio-group-${i}`} type="radio" />
          <label htmlFor={`radio-${i}`} className={style['radio-custom-label']}>{l}</label>
        </div>
      ))
      }
    </form>);
}


function CheckboxIconButton({ ...props }:Props) {
  const { labels } = props;
  return (
    <form name="checkboxForm">
      { labels.map((l, i) => (
        <div key={i}>
          <Field
            id={`checkbox-${l}`}
            className="checkbox"
            name={`checkbox-${l}`}
            type="checkbox"
            component="input"
          />
          <label htmlFor={`checkbox-${i}`} className="checkbox">{l}</label>
        </div>
      ))
      }
    </form>
  );
}

export default reduxForm({
  form: 'checkboxForm',
  destroyOnUnmount: false
})(CheckboxIconButton);
