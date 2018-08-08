import React from 'react';

export const MARCcatContext = React.createContext({});

type Props = {
  root: Object;
  stripes: Object;
  history: Object;
  match: Object;
};

type State = {}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component<Props, State> {
    render() {
      const { store } = this.props.root;
      const state = store.getState();
      const router = this.props.history;
      return (
        <MARCcatContext.Consumer>
          {() => <WrappedComponent
            {...this.props}
            state={state}
            router={router}
          />}
        </MARCcatContext.Consumer>
      );
    }
  }
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

export default withSubscription;

