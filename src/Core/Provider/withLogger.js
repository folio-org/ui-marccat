import React from 'react';
// import logger from '@folio/stripes-logger';
import getDisplayName from '../Utils/utils';

// const Logger = require('./stripes-logger.js');

// const l = new Logger('redux,action');
// l.setTimestamp(true);
// l.log('path', `substitutePath generated ${path}`);
// l.log('action', 'user searched for', query);

export default function withLogger(WrappedComponent) {
  class WithLogger extends React.Component {
    render() {
      // const { cat } = this.props;
      // const log = new Logger(cat);
      return (
        <WrappedComponent
          {...this.props}
          // log={log}
        />
      );
    }
  }
  WithLogger.displayName = `WithLogger(${getDisplayName(WrappedComponent)})`;
  return WithLogger;
}
