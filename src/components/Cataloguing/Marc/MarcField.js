// @flow
import * as React from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames';
import { IconButton } from '@folio/stripes/components';
import { sharedInputStylesHelper } from '../../../shared';
import type { Props } from '../../../flow/types.js.flow';
import style from '../Style/index.css';

type P = {
  label?: string,
  value?: string,
  onClick?: () => void,
  onClickPlusSign: () => void,
} & Props

export default class MarcField extends React.Component<P, {}> {

  componentDidMount() {
    const {
      name,
      value,
      dispatch,
      change,
    } = this.props;
    dispatch(change(name, value));
  }

  renderIcon = (props: P): React.Component<P, *> => (
    <div className={style.marcFieldIconCaret}>
      <IconButton
        icon={(props.icon) ? 'icon-trash' : 'caret-down'}
        size="medium"
        disabled={props.disbledIcon}
        onClick={props.onClick}
      />
    </div>
  );

  getInputClass() {
    return classNames(
      sharedInputStylesHelper(this.props),
    );
  }

  getRootClass() {
    return classNames(
      style.fieldWrapper
    );
  }

  render() {
    const {
      name,
      label,
      onClick,
      onChange,
      component,
      readOnly,
      prependIcon,
    } = this.props;
    return (
      <div className={this.getRootClass()}>
        {prependIcon && <this.renderIcon {...this.props} />}
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
        {!prependIcon && <this.renderIcon {...this.props} onClick={onClick} />}
      </div>
    );
  }
}
