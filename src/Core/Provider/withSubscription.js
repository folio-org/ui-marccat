import React from 'react';
import { actionMenuItem } from '..';

export const MARCcatContext = React.createContext({});

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
      const commonActionMenuItem = actionMenuItem(['ui-marccat.indexes.title', 'ui-marccat.diacritic.title'], [() => this.props.history.push(this.props.match.path + '/indexList'), () => this.props.history.push(this.props.match.path + '/diacritic')]);
      return (
        <MARCcatContext.Consumer>
          {() => <WrappedComponent
            {...this.props}
            state={state}
            log={log}
            actionMenuItems={commonActionMenuItem}
          /> }
        </MARCcatContext.Consumer>
      );
    }
  }
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

export default withSubscription;

