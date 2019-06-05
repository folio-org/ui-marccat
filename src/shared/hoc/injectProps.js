//
import * as React from 'react';
import { withRoot } from '@folio/stripes-core/src/components/Root/RootContext';
import { change, reset } from 'redux-form';
import { injectIntl } from 'react-intl';
import { safeObj, Localize } from '../utils/Function';

/**
 * hoc
 * @param {WrappedComponent} a Component to inject props
 */
export default (Component) => {
  const WrapperComponent = (props) => {
    const { history, root: { store }, intl: { formatMessage } } = props;
    const state = store.getState();
    const { dispatch } = store;
    const data = state.marccat;
    const form = safeObj(state, 'form');
    const dataStore = safeObj(state.marccat, 'data');
    const settings = safeObj(state.marccat, 'settings');
    const searchHistory = safeObj(state.marccat, 'history');
    const localizedMessage = (m, withContainier, _wrapElement) => Localize({ key: m }, withContainier, _wrapElement);
    return (
      <Component
        {...props}
        data={data}
        forms={form}
        reset={reset}
        store={store}
        change={change}
        router={history}
        dispatch={dispatch}
        settings={settings}
        datastore={dataStore}
        translate={formatMessage}
        localized={localizedMessage}
        searchHistory={searchHistory}
      />
    );
  };
  return withRoot(injectIntl(WrapperComponent));
};
