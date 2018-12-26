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
      { React.Children.map(labels, (l, i) => (
        <div key={i}>
          <Field
            id={`checkbox-${l}`}
            className={style['checkbox-custom']}
            name={`checkbox-${l}`}
            component="input"
          />
          <label htmlFor={`checkbox-${i}`} className={style['checkbox-custom-label']}>{l}</label>
        </div>
      ))
      }
    </form>
  );
}

export default reduxForm({
  form: 'checkboxForm'
})(CheckboxIconButton);
