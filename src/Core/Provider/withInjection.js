/**
 * @author: Christian Chiama
 *
 * @format
 * @flow
 */
import * as React from 'react';
import Logger from '@folio/stripes-logger';
import { LOGGER_CONFIG } from '../../Utils/Constant';

const l = new Logger(LOGGER_CONFIG.CATEGORY);
l.setPrefix(LOGGER_CONFIG.PREFIX);
l.setTimestamp(LOGGER_CONFIG.TIMESTAMP);

/**
 * HOC
 * @param {WrappedComponent} a Component to inject props
 */
export default function injectCommonProp<Props: {}>(Component: React.ComponentType<Props>): React.ComponentType<Props> {
  return function WrapperComponent(props: Props) {
    const { store } = props.root;
    const state = store.getState();
    const rootPath = props.match.path;
    return <Component
      {...props}
      state={state}
      router={props.history}
      rootPath={rootPath}
      translate={props.stripes.intl.formatMessage}
      log={l}
    />;
  };
}

