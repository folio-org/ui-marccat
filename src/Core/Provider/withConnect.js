import * as React from 'react';
import { withRoot } from '@folio/stripes-core/src/components/Root/RootContext';
import Logger from '@folio/stripes-logger';
import { connect } from '@folio/stripes-connect';
import { LOGGER_CONFIG, META } from '../../Utils/Constant';

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

function withConnect(WrappedComponent) {
  class WithConnect extends React.Component<Props, State> {
    render() {
      const { store } = this.props.root;
      const state = store.getState();
      const router = this.props.history;
      const l = new Logger(LOGGER_CONFIG.CATEGORY);
      l.setPrefix(LOGGER_CONFIG.PREFIX);
      l.setTimestamp(LOGGER_CONFIG.TIMESTAMP);
      return (
        <MARCcatContext.Consumer>
          {() => <WrappedComponent
            {...this.props}
            state={state}
            router={router}
            log={l}
          />}
        </MARCcatContext.Consumer>
      );
    }
  }
  WithConnect.displayName = `WithConnect(${getDisplayName(WrappedComponent)})`;
  return withRoot(connect(WrappedComponent, META.MODULE_NAME));
}

export default withConnect;

