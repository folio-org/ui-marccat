/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import style from '../../Style/InputField.css';

type Props = {
  labels: Array<any>,
};

export function RadioIconButton({ ...labels }:Props) {
  return (
    <React.Fragment>
      { labels.map((l, i) => (
        <div key={i}>
          <input id={`radio-${i}`} className="radio-custom" name="radio-group" type="radio" checked />
          <label htmlFor={`radio-${i}`} className="radio-custom-label">{l}</label>
        </div>
      ))
      }
    </React.Fragment>);
}


export function CheckboxIconButton({ ...props }:Props) {
  const { labels } = props;
  return (
    <React.Fragment>
      { labels.map((l, i) => (
        <div key={i}>
          <input id={`checkbox-${i}`} className={style['checkbox-custom']} name={`checkbox-${i}`} type="checkbox" />
          <label htmlFor={`checkbox-${i}`} className={style['checkbox-custom-label']}>{l}</label>
        </div>
      ))
      }
    </React.Fragment>);
}
