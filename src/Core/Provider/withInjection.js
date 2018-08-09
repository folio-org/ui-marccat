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


export function withLogger<Props, Component: React.ComponentType<Props>>(
  WrappedComponent: Component
): React.ComponentType<React.ElementConfig<Component>> {
  return props => <WrappedComponent {...props} log={l} />;
}

/**
 * @param {WrappedComponent} a Component to inject props
 */
export function injectProp<Props: {}>(Component: React.ComponentType<Props>, prop: Object): React.ComponentType<Props> {
  return function WrapperComponent(props: Props) {
    return <Component {...props} prop={prop} />;
  };
}

/**
 * @param {WrappedComponent} a Component to pass props
 */
export function withNavigation<Props, Component: React.ComponentType<Props>>(
  WrappedComponent: Component
): React.ComponentType<React.ElementConfig<Component>> {
  return props => <WrappedComponent {...props} navigation={{}} />;
}

/**
 * @param {WrappedComponent} a Component to pass props
 */
export function withInheritedManifest<Props, Component: React.ComponentType<Props>>(
  WrappedComponent: Component
): React.ComponentType<React.ElementConfig<Component>> {
  return props => <WrappedComponent {...props} log={{}} />;
}

