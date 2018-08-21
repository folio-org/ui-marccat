import * as React from 'react';
import { withRoot } from '@folio/stripes-core/src/components/Root/RootContext';
import { connect } from '@folio/stripes-connect';
import { META } from '../../Utils/Constant';

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
      const { formatMessage } = this.props.stripes.intl;
      const state = store.getState();
      const router = this.props.history;
      return (
        () => <WrappedComponent
          {...this.props}
          state={state}
          router={router}
          translate={formatMessage}
        />
      );
    }
  }
  WithConnect.displayName = `WithConnect(${getDisplayName(WrappedComponent)})`;
  return withRoot(connect(WrappedComponent, META.MODULE_NAME));
}

export default withConnect;

