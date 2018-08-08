import * as React from 'react';
// import logger from '@folio/stripes-logger';
// const Logger = require('./stripes-logger.js');

// const l = new Logger('redux,action');
// l.setTimestamp(true);
// l.log('path', `substitutePath generated ${path}`);
// l.log('action', 'user searched for', query);

export default function withLogger<Props, Component: React.ComponentType<Props>>(
  WrappedComponent: Component
): React.ComponentType<React.ElementConfig<Component>> {
  return props => <WrappedComponent {...props} log={{}} />;
}
