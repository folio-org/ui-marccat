/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import style from '../../Style/InputField.css';

type Props = {
  labels: Array<any>,
};

export function RadioIconButton({ ...props }:Props) {
  const { labels } = props;
  return (
    <React.Fragment>
      { React.Children.map(labels, (l, i) => (
        <div key={i}>
          <input id={`radio-${i}`} className={style['radio-custom']} name={`radio-group-${i}`} type="radio" />
          <label htmlFor={`radio-${i}`} className={style['radio-custom-label']}>{l}</label>
        </div>
      ))
      }
    </React.Fragment>);
}


export function CheckboxIconButton({ ...props }:Props) {
  const { labels } = props;
  return (
    <React.Fragment>
      { React.Children.map(labels, (l, i) => (
        <div key={i}>
          <input id={`checkbox-${i}`} className={style['checkbox-custom']} name={`checkbox-${i}`} type="checkbox" />
          <label htmlFor={`checkbox-${i}`} className={style['checkbox-custom-label']}>{l}</label>
        </div>
      ))
      }
    </React.Fragment>);
}
