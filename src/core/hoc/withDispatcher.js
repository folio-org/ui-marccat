
import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const withDispatcher = WrappedComponent => class WithDispatcherComponent extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch, actions } = props;
    this.dispatcher = bindActionCreators(actions, dispatch);
  }

  render() {
    return (
      <WrappedComponent
        {...this.dispatcher}
        {...this.props}
      />
    );
  }
};
export default connect()(withDispatcher);
