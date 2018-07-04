import React from 'react';

type ErrorWrapperProps = {|
  children: Object,
|};

type ErrorWrapperState = {|
  hasError: Object,
|}

const withErrorHandler = WrappedComponent =>
  class WithErrorHandlerComponent extends React.Component<ErrorWrapperProps, ErrorWrapperState> {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
      this.setState({ hasError: false });
      console.log('error: ', error); // eslint-disable-line no-console
      console.log('info: ', info);// eslint-disable-line no-console
    }
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }
      return (
        <WrappedComponent>
          {this.props.children}
        </WrappedComponent>);
    }
  };
export default withErrorHandler;
