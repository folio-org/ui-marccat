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
  match: Object,
  history: Object,
  stripes: Object
}>(Component: React.ComponentType<Props>): React.ComponentType<Props> {
  function WrapperComponent(props: Props) {
    const { store } = props.root;
    const state = store.getState();
    const rootPath = props.match.path;
    return (
      <Component
        {...props}
        state={state}
        router={props.history}
        rootPath={rootPath}
        translate={props.intl.formatMessage}
      />);
  }
  /* copy static method otherwise in HOC, a static method will be lose */
  hoistNonReactStatic(WrapperComponent, Component);
  return withRoot(injectIntl(connect(WrapperComponent, META.MODULE_NAME)));
}
