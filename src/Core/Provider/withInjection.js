/**
 * @author: Christian Chiama
 *
 * @format
 * @flow
 */
import * as React from 'react';
import { withRoot } from '@folio/stripes-core/src/components/Root/RootContext';
import { connect } from '@folio/stripes-connect';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { injectIntl } from 'react-intl';
import { META } from '../../Utils/Constant';

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
    return (
      <Component
        {...props}
        store={store}
        router={props.history}
        translate={props.intl.formatMessage}
      />);
  }
  /* copy static method otherwise in HOC, a static method will be lose */
  hoistNonReactStatic(WrapperComponent, Component);
  return withRoot(injectIntl(connect(WrapperComponent, META.MODULE_NAME)));
}
