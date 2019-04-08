/**
 *
 * @format
 * @flow
 */
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

type ReduxPrpops = {};


export default function (
  ReduxBindActionCreatorWrapper:React.ComponentType<ReduxPrpops>,
  mapStatetoProps: () => void,
  actionCreators: () => void
) : React.ComponentType<ReduxPrpops> {
  class ReduxContainer extends React.PureComponent<ReduxPrpops, {
  }> {
    constructor(props) {
      super(props);
      const { dispatch } = props;
      this.boundActionCreators = bindActionCreators(actionCreators,
        dispatch);
    }

    render() {
      return (
        <ReduxBindActionCreatorWrapper
          {...this.props}
          {...this.boundActionCreators}
        />
      );
    }
  }
  return connect(mapStatetoProps)(ReduxContainer);
}
