/**
 * @author: Christian Chiama
 *
 * @format
 * @flow
 */
import * as React from 'react';
import { withRoot } from '@folio/stripes-core/src/components/Root/RootContext';
import { connect } from '@folio/stripes-connect';
import { injectIntl } from 'react-intl';
import { META } from '../../utils/Constant';

/**
 * HOC
 * @param {WrappedComponent} a Component to inject props
 */
export default function injectCommonProp<Props: {
  root: Object,
  history: Object,
  stripes: Object;
  intl: Object;
}>(Component: React.ComponentType<Props>): React.ComponentType<Props> {
  function WrapperComponent(props: Props) {
    const { store } = props.root;
    const state = store.getState();
    const data = state.marccat;
    return (
      <Component
        {...props}
        store={store}
        data={data}
        isVisible
        router={props.history}
        translate={props.intl.formatMessage}
      />);
  }
  return withRoot(injectIntl(connect(WrapperComponent, META.MODULE_NAME)));
}
