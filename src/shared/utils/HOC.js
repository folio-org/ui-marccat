// @flow
import * as React from 'react';
import { withRoot } from '@folio/stripes-core/src/components/Root/RootContext';
import { injectIntl } from 'react-intl';
import { safeObj, Localize } from './Function';

type DefaultProps = {};
type Props = {...DefaultProps};
/**
 * hoc
 * @param {WrappedComponent} a Component to inject props
 */
export default (Component: React.ComponentType<Props>): React.ComponentType<React.ElementConfig<React.Component>> => {
  const WrapperComponent = (props: Props): React.ComponentType<Props> => {
    const { history, root: { store }, intl: { formatMessage } } = props;
    const state = store.getState();
    const data = state.marccat;
    const form = safeObj(state, 'form');
    const dataStore = safeObj(state.marccat, 'data');
    const settings = safeObj(state.marccat, 'settings');
    const searchHistory = safeObj(state.marccat, 'history');
    const localizedMessage = (m: Array<*> | String, withContainier?: boolean, _wrapElement?: React<HTMLElement>) => Localize({ key: m }, withContainier, _wrapElement);
    return (
      <Component
        {...props}
        data={data}
        forms={form}
        store={store}
        router={history}
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
