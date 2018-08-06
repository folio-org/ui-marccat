import React from 'react';
import { actionMenuItem } from '..';

export const RootContext = React.createContext();

type Props = {
  root: Object;
  stripes: Object;
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
      const log = this.props.stripes.logger;
      const commonActionMenuItem = actionMenuItem('ui-marccat.diacritic.title', () => {});
      return (
        <RootContext.Consumer>
          {() => <WrappedComponent
            {...this.props}
            state={state}
            log={log}
            actionMenuItems={commonActionMenuItem}
          /> }
        </RootContext.Consumer>
      );
    }
  }
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

export default withSubscription;

