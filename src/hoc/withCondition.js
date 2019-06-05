// @flow
import * as React from 'react';
import { compose } from 'recompose';
import {
  Icon
} from '@folio/stripes/components';
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
export const Loading = (Component) => ({ condition, ...rest }) => (
  condition
    ? <Icon icon="spinner-ellipsis" />
    : <Component {...rest} />);

export const withLoading = compose(
  Loading
);

export const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) => (
  conditionalRenderingFn(props)
    ? <EitherComponent />
    : <Component {...props} />);
