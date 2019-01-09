import React from 'react';
import { Field } from 'redux-form';
import { IconButton } from '@folio/stripes/components';
import type { Props } from '../../../core';
import style from '../Style/style.css';
import { ActionTypes } from '../../../redux/actions';


export default class MarcField extends React.Component<Props, {}> {
  render() {
    const { dispatch, change, label, name, value, onClick, bibliographicRecord } = this.props;
    dispatch(change(name, value));
    dispatch({ type: ActionTypes.LEADER_VALUES_FROM_TAG, leader: bibliographicRecord.leader.value, code: bibliographicRecord.leader.code, typeCode: '15' });
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
