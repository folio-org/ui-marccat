// @flow
import * as React from 'react';
import { lifecycle } from 'recompose';


const LyfeCyclecomponent = WrappedComponent => {
  return ({ ...props }) => <WrappedComponent {...props} />;
};

export default lifecycle<P, S, T>({

  /**
   * @returns
   */
  componentDidMount(): void { this.props.onDidMount(); },

  /**
   *
   * @param {*} nextProps
   * @param {*} nextState
   * @param {*} nextContext
   */
  shouldComponentUpdate<P, S>(nextProps: P, nextState: S, nextContext: {}) {
    this.props.onShouldComponentUpdate(nextProps, nextState, nextContext);
  },

  /**
   * @returns
   */
  componentWillUnmount() {
    this.props.onWillUnmount();
  },

  /**
   *
   * @param {*} _error
   * @param {*} _errorInfo
   */
  componentDidCatch(_error: Error, _errorInfo: {}) {
    this.props.onDidCatch();
  },

  /** s
   *
   * @param {*} prevProps
   * @param {*} prevState
   */
  getSnapshotBeforeUpdate<P, S>(prevProps: P, prevState: S): any | null {
    return this.props.onGetSnapshotBeforeUpdate(prevProps, prevState);
  },

  /**
   *
   * @param {*} prevProps
   * @param {*} prevState
   * @param {*} snapshot
   */
  componentDidUpdate<P, S, SS>(prevProps: P, prevState: S, snapshot?: SS): void {
    this.props.onDidUpdate(prevProps, prevState, snapshot);
  },
})(LyfeCyclecomponent);
