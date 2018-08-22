/**
 *
 * @format
 * @flow
 */
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

function getDisplayName(WrappedComponent: React.ComponentType<Props>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withConnect(WrappedComponent: React.ComponentType<Props>) {
  class WithConnect extends React.Component<Props, State> {
    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }
  WithConnect.displayName = `WithConnect(${getDisplayName(WrappedComponent)})`;
  return withRoot(connect(WrappedComponent, META.MODULE_NAME));
}

export default withConnect;

