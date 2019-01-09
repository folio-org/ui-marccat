import React from 'react';
import { Field } from 'redux-form';
import { IconButton } from '@folio/stripes/components';
import type { Props } from '../../../core';
import style from '../Style/style.css';


export default class MarcField extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { dispatch, change, label, name, value, onClick } = this.props;
    dispatch(change(name, value));
    return (
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
          <IconButton
            icon="caret-down"
            size="large"
            onClick={onClick}
          />
        </div>
      </div>
    );
  }
}
