import React from 'react';
import { HotKeys } from '@folio/stripes-components';

type P = {
    keys: {},
    handlers: {}
};

const HotKeysHOC = ({ keys, handlers, ...children }:P) => (
  <HotKeys keyMap={keys} handlers={handlers} style={{ width: 100 + '%' }}>
{...children}
  </HotKeys>);

function HotKeysHOC(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        keyMap: {},
        handlers: {},
      };
    }

    componentDidMount() {
    //
    }

    componentWillUnmount() {
      //
    }

    render() {
      const { keyMap, handlers } = this.props;
      return (
        <HotKeys keyMap={keyMap} handlers={handlers} style={{ width: 100 + '%' }}>
          <WrappedComponent {...this.props} />
        </HotKeys>);
    }
  };
}

export default HotKeysHOC;
