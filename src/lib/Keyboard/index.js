import React from 'react';
import { HotKeys } from '@folio/stripes/components';

type P = {
    keys: {},
    handlers: {}
};

const HotKeysHOC = ({ keys, handlers, ...children }:P) => (
  <HotKeys keyMap={keys} handlers={handlers} style={{ width: 100 + '%' }}>
{...children}
  </HotKeys>);

export default HotKeysHOC;
