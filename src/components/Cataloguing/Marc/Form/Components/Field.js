// @flow
import * as React from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames';
import { IconButton } from '@folio/stripes/components';
import { sharedInputStylesHelper } from '../../../../../shared';
import type { Props } from '../../../../../flow/types.js.flow';
import style from '../../../Style/index.css';

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
      change,
    } = this.props;
    change(name, value);
  }

  renderIcon = ({ onClick, prependIcon, ...props }) => (
    <div className={style.marcFieldIconCaret} style={{ paddingLeft: (prependIcon) ? 0 : 16, paddingRight: (prependIcon) ? 8 : 0 }}>
      <IconButton
        icon="caret-down"
        size="medium"
        disabled={props.disbledIcon}
        onClick={onClick}
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
      disbledIcon,
      component,
      value,
      readOnly,
      prependIcon,
    } = this.props;
    return (
      <div className={this.getRootClass()}>
        {prependIcon && <this.renderIcon {...this.props} onClick={onClick} />}
        <label htmlFor={name}>{label}</label>
        <Field
          {...this.props}
          id={name}
          name={name}
          type="text"
          readOnly={readOnly}
          component={component || 'input'}
          label={label}
          disabled={disbledIcon}
          onChange={onChange}
          value={value}
        />
        {!prependIcon && <this.renderIcon {...this.props} onClick={onClick} />}
      </div>
    );
  }
}
