import React from 'react';
import PropTypes from 'prop-types';
import { Route as RouterRoute } from 'react-router-dom';

export { Switch, Redirect } from 'react-router-dom';

export function WrapRouter({ component: Component, children, ...props }) {
  // we currently always provide a component
  /* istanbul ignore else */
  if (Component) {
    return (
      <RouterRoute {...props} render={props => (<Component {...props}>{children}</Component>)} /> // eslint-disable-line no-shadow
    );
  } else {
    return (<RouterRoute {...props}>{children}</RouterRoute>);
  }
}

WrapRouter.propTypes = {
  component: PropTypes.func,
  children: PropTypes.node
};
