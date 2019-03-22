import React from 'react';
import { Field } from 'redux-form';
import { IconButton } from '@folio/stripes/components';
import type { Props } from '../../../core';
import style from '../Style/style.css';

type P = Props & {
  label?: string,
  onClick?: () => void,
  onClickPlusSign: () => void,
};

export default class MarcField extends React.Component<P, {}> {
  render() {
    const {
      dispatch,
      change,
      label,
      name,
      value,
      onClick,
      text,
      readOnly,
      onAdd,
      onDelete,
      placeholder,
      component,
      display,
      withIcon,
    } = this.props;
    dispatch(change(name, value));
    return (withIcon) ? (
      <div>
        <label htmlFor={name}>{label}</label>
        <Field
          id={name}
          name={name}
          type={'text' || text}
          placeholder={placeholder}
          readOnly={readOnly}
          component={component || 'input'}
        />
        <div className={style.marcFieldIconCaret}>
          <IconButton
            icon="caret-down"
            size="large"
            onClick={onClick}
          />
          <IconButton
            icon="plus-sign"
            size="large"
            style={{ display: (display) || 'none' }}
            onClick={onAdd}
          />
          <IconButton
            icon="trash"
            size="large"
            style={{ display: (display) || 'none' }}
            onClick={onDelete}
          />
        </div>
      </div>
    ) :
      <Field
        id={name}
        name={name}
        type="text"
        readOnly={readOnly}
        component={component || 'input'}
        label={label}
        value={value}
      />;
  }
}
