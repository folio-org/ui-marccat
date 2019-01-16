import React from 'react';
import { Field } from 'redux-form';
import { IconButton } from '@folio/stripes/components';
import type { Props } from '../../../core';
import style from '../Style/style.css';

type P = Props & {
  display: string,
  label?: string,
  value: string,
  onClick?: () => void,
  readOnly: boolean,
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
      readOnly,
      onAdd,
      initialize,
      onDelete,
      component,
      display,
      withIcon,
    } = this.props;
    change(name, value);
    return (withIcon) ? (
      <div>
        <label htmlFor={name}>{label}</label>
        <Field
          id={name}
          name={name}
          type="text"
          readOnly={readOnly}
          component={component || 'input'}
          label={label}
          value={value}
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
      <React.Fragment>
        <Field
          id={name}
          name={name}
          type="text"
          readOnly={readOnly}
          component={component || 'input'}
          label={label}
          value={value}
        />
      </React.Fragment>;
  }
}
