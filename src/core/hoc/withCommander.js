/**
 *
 * @format
 * @flow
 */
import * as React from 'react';
import { CommandList } from '@folio/stripes/components';

/**
 * HOC
 * @param {WrappedComponent} a Component to inject props
 */
export default function withCommander<Props: {
}>(Component: React.ComponentType<Props>): React.ComponentType<Props> {
  function WrapperComponent(props: Props) {
    return (
      <CommandList
        commands={{}}
      >
        <Component {...props} />
      </CommandList>
    );
  }
  return WrapperComponent;
}
