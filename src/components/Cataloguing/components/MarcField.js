import React from 'react';
import { Field } from 'redux-form';
import { Icon } from '@folio/stripes/components';
import type { Props } from '../../../core';
import style from '../Style/style.css';

export default class MarcField extends React.Component<Props, {}> {
  render() {
    const { dispatch, change, label, name, value } = this.props;
    dispatch(change(name, value));
    return (
      <div className={style.titleCollapsiblePanel}>
        <div>
          <label htmlFor={name}>{label}</label>
          <Field
            id={name}
            name={name}
            type="text"
            component="input"
            value={value}
          />
          <div className={style.marcFieldIconCaret}>
            <Icon
              icon="caret-down"
              size="large"
            />
          </div>
        </div>
      </div>
    );
  }
}
