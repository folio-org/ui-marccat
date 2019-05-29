/* eslint-disable consistent-return */
import * as React from 'react';
import { Field as FormField } from 'redux-form';
import { IconButton } from '@folio/stripes/components';
import classNames from 'classnames/bind';
// eslint-disable-next-line import/no-duplicates
import style from '../Style/index.css';

// eslint-disable-next-line import/no-duplicates
import '../Style/index.css';

const cx = classNames.bind(style);

export const InputField = props => {
  const { input, type, meta, autoFocus, readOnly } = props;
  return (
    <React.Fragment>
      <input {...input} name={input.name} value={input.value} type={type} autoFocus={autoFocus} readOnly={readOnly} />
      {meta.error &&
        meta.touched &&
        !meta.active && (
        <div className="feedback-text error-text">{meta.error}</div>
      )}
    </React.Fragment>
  );
};


export const Field = ({ name, label, disbledIcon, prepend, onClick, readOnly, ...rest }) => (
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
      <FormField
        name={name}
        readOnly={readOnly}
        component={InputField}
        autoFocus={label === name}
        {...rest}
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
