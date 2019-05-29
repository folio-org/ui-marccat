/* eslint-disable consistent-return */
import * as React from 'react';
import { Field } from 'redux-form';
import { IconButton } from '@folio/stripes/components';
import classNames from 'classnames/bind';
import style from '../Style/index.css';

const cx = classNames.bind(style);

// eslint-disable-next-line no-unused-vars
const getValidityClassName = meta => {
  if (meta.asyncValidating) {
    return 'async-validating';
  }
  if (meta.active) {
    return;
  }
  if (meta.touched && meta.invalid) {
    return 'invalid';
  }
  if (meta.touched && meta.valid) {
    return 'valid';
  }
};


export const InputField = props => {
  const { input, type, meta, autoFocus, readOnly } = props;
  return (
    <React.Fragment>
      <input {...input} name={input.name} type={type} autoFocus={autoFocus} readOnly={readOnly} />
      {meta.error &&
        meta.touched &&
        !meta.active && (
        <div className="feedback-text error-text">{meta.error}</div>
      )}
    </React.Fragment>
  );
};


export const FormField = ({ name, label, disbledIcon, prepend, onClick, readOnly }) => (
  <React.Fragment>
    <div className={cx('fieldWrapper')}>
      <div className={cx('marcFieldIconCaretPrepend')} hidden={!prepend}>
        <IconButton
          icon="caret-down"
          size="medium"
          disabled={disbledIcon}
          onClick={onClick}
        />
      </div>
      <label htmlFor={name}>{label}</label>
      <Field
        name={name}
        readOnly={readOnly}
        component={InputField}
        autoFocus={label === name}
        required
      />
      <div
        className={cx('marcFieldIconCaret')}
        hidden={prepend}
      >
        <IconButton
          icon="caret-down"
          size="medium"
          disabled={disbledIcon}
          onClick={onClick}
        />
      </div>
    </div>
  </React.Fragment>
);
