import React from 'react';
import NoResultsMessage from '@folio/stripes-smart-components/lib/SearchAndSort/components/NoResultsMessage';

type RequestProps = {|
    children: Object,
|};

type RequestState = {|
    hasError: Object,
|}

const withRequestHandler = WrappedComponent =>
  class WithErrorHandlerComponent extends React.Component<RequestProps, RequestState> {
    constructor(props) {
      super(props);
      this.state = {
        isPending: false,
        isResolved: false,
        onError: () => { }
      };
    }

    componentDidCatch(error, info) {
      this.setState({ hasError: true });
      console.log('error: ', error); // eslint-disable-line no-console
      console.log('info: ', info);// eslint-disable-line no-console
    }
    render() {
      if (this.state.isPending) {
        return <NoResultsMessage />;
      }
      return (
        <WrappedComponent>
          {this.props.children}
        </WrappedComponent>);
    }
  };
export default withRequestHandler;
