/* eslint-disable consistent-return */
import * as React from 'react';
import { Field } from 'redux-form';
import { compose, withState, withHandlers } from 'recompose';
import { IconButton } from '@folio/stripes/components';
import classNames from 'classnames/bind';
import style from '../../../Style/index.css';
import { TAGS } from '../../../Utils/MarcConstant';

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

export const MarcInputField = props => {
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

const withToggle = compose(
  withState('toggledOn', 'toggle', false),
  withHandlers({
    show: ({ toggle }) => (_e) => toggle(true),
    hide: ({ toggle }) => (_e) => toggle(false),
    toggle: ({ toggle }) => (_e) => toggle((current) => !current)
  })
);


// const IconToggle = withToggle(({ _status, _toggledOn, toggle }) => (
//   <div className={cx('marcFieldIconCaretPrepend')}>
//     <IconButton
//       icon="caret-down"
//       size="medium"
//       onClick={toggle}
//     />
//   </div>));

export const MarcField = ({ name, label, disbledIcon, prepend, onClick, readOnly }: Props) => (
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
        component={MarcInputField}
        autoFocus={label === TAGS._006}
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
