import React from 'react';

type CloseWrapperProps = {
  handleClose: Function;
  children: Object,
};

type CloseWrapperState = {
  isOpen: bool,
};

const withCloseHandler = WrappedComponent =>
  class WithCloseHandlerComponent extends React.Component<
    CloseWrapperProps,
    CloseWrapperState
  > {
    constructor(props) {
      super(props);
      this.state = { isOpen: false };
    }

    handleClose = () => {
      this.setState({
        isOpen: false
      });
    };

    render() {
      return (
        <WrappedComponent {...this.props} handleClose={this.handleClose}>
          {this.props.children}
        </WrappedComponent>
      );
    }
  };
export default withCloseHandler;
