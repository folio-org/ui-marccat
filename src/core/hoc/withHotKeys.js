/* eslint-disable react/destructuring-assignment */
/**
 * @author: Christian Chiama
 *
 * @format
 * @flow
 */
import * as React from 'react';
import { HotKeys } from '@folio/stripes-core';

/**
 * HOC
 * @param {WrappedComponent} a Component to inject props
 */
export default function withHotKeys
<Props: {
  root: Object
}>(): React.ComponentType<Props> {
  function WrapperComponent(props: Props) {
    return (
      <HotKeys {...props} />);
  }
  return WrapperComponent;
}
