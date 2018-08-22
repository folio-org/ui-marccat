/**
 * @author: Christian Chiama
 *
 * @format
 * @flow
 */
import * as React from 'react';
import Logger from '@folio/stripes-logger';
import { withRoot } from '@folio/stripes-core/src/components/Root/RootContext';
import { connect } from '@folio/stripes-connect';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { LOGGER_CONFIG, META } from '../../Utils/Constant';

export const MARCcatContext = React.createContext({});

const l = new Logger(LOGGER_CONFIG.CATEGORY);
l.setPrefix(LOGGER_CONFIG.PREFIX);
l.setTimestamp(LOGGER_CONFIG.TIMESTAMP);

/**
 * HOC
 * @param {WrappedComponent} a Component to inject props
 */
export default function injectCommonProp<Props: {}>(Component: React.ComponentType<Props>): React.ComponentType<Props> {
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
        translate={props.stripes.intl.formatMessage}
        log={l}
      />);
  }
  /* copy static method otherwise in HOC, a static method will be lose */
  hoistNonReactStatic(WrapperComponent, Component);
  return withRoot(connect(WrapperComponent, META.MODULE_NAME));
}
