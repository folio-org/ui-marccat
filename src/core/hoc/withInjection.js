/**
 * @author: Christian Chiama
 *
 * @format
 * @flow
 */
import * as React from 'react';
import { withRoot } from '@folio/stripes-core/src/components/Root/RootContext';
import { injectIntl } from 'react-intl';

/**
 * HOC
 * @param {WrappedComponent} a Component to inject props
 */
export default function injectCommonProp<Props: {
}>(Component: React.ComponentType<Props>): React.ComponentType<Props> {
  function WrapperComponent(props: Props) {
    const { history, root: { store }, intl: { formatMessage } } = props;
    const state = store.getState();
    const data = state.marccat;
    const dataStore = state.marccat.data;
    return (
      <Component
        {...props}
        store={store}
        data={data}
        datastore={dataStore}
        router={history}
        translate={formatMessage}
      />
    );
  }
  return withRoot(injectIntl(WrapperComponent));
}
