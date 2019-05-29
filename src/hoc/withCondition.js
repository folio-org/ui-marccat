// @flow
import * as React from 'react';
import { compose } from 'recompose';
/**
 *
 *
 * @export
 * @param {*} conditionalFn
 * @param {*} otherComponent
 * @returns
 */
export default (conditionalFn, BaseComponent) => {
  return Component => {
    return props => {
      return conditionalFn(props)
        ? <BaseComponent {...props} />
        : <Component {...props} />;
    };
  };
};
export const withNull = (Component, conditionFn) => (props) => (
  conditionFn(props)
    ? null
    : <Component {...props} />);


export const withEmpty = Component => ({ prop, msg, ...rest }) => (
  !prop.length
    ? <span>{msg}</span>
    : <Component {...rest} />);
/**
 *
 * @param {*} Component
 */
export const withLoading = (Component) => ({ condition, msg, ...rest }) => (
  condition
    ? <span>{msg}</span>
    : <Component {...rest} />);

export const withCondition = compose(
  withLoading,
  withNull,
  withEmpty
);
