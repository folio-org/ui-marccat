// @flow
// @flow
import * as React from 'react';
import { connect } from 'react-redux';

type DefaultProps = {};
type Props = {...DefaultProps};

export const mapStateToProps = _state => ({});

export const mapDispatchToProps = _dispatch => ({});

export const hocDefaultDisplayValue = (WrappedComponent) => {
  const hocComponent = ({ ...props }: Props) => <WrappedComponent {...props} />;

  return hocComponent;
};

export default WrapperComponent => connect(mapStateToProps, mapDispatchToProps)(hocDefaultDisplayValue(WrapperComponent));
