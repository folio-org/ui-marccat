import * as React from 'react';

export default function withNavigation<Props, Component: React.ComponentType<Props>>(
  WrappedComponent: Component
): React.ComponentType<React.ElementConfig<Component>> {
  return props => <WrappedComponent {...props} log={{}} />;
}
