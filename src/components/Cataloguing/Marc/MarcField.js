// @flow
import * as React from 'react';
import { Field } from 'redux-form';
import { IconButton } from '@folio/stripes/components';
import type { Props } from '../../../flow/types.js.flow';
import style from '../Style/index.css';

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
      disbledIcon,
      onChange,
      readOnly,
      onDelete,
      placeholder,
      component,
      withIcon,
    } = this.props;
    dispatch(change(name, value)); // to remove this check and use initialize({ [name]: value })
    return (withIcon) ? (
      <div>
        <IconButton
          icon="caret-down"
          size="medium"
          disabled={disbledIcon}
          onClick={onClick}
        />
        <label htmlFor={name}>{label}</label>
        <Field
          className={style.small}
          id={name}
          name={name}
          type={'text' || text}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={onChange}
          component={component || 'input'}
        />
        <div className={style.marcFieldIconCaret}>
          <IconButton
            icon="trash"
            size="medium"
            onClick={onDelete}
          />
        </div>
      </div>
    ) :
      <div>
        <label htmlFor={name}>{label}</label>
        <Field
          id={name}
          name={name}
          type="text"
          readOnly={readOnly}
          component={component || 'input'}
          label={label}
          onChange={onChange}
        />
        <div className={style.marcFieldIconCaret}>
          <IconButton
            icon="caret-down"
            size="medium"
            disabled={disbledIcon}
            onClick={onClick}
          />
        </div>
      </div>;
  }
}
