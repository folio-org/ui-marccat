import React from 'react';

export const NavigationContext = React.createContext({});

type Props = {};
type State = {}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withNavigation(WrappedComponent) {
  class WithNavigation extends React.Component<Props, State> {
    render() {
      return (
        <NavigationContext.Consumer>
          {() => <WrappedComponent
            {...this.props}
          />}
        </NavigationContext.Consumer>
      );
    }
  }
  WithNavigation.displayName = `WithNavigation(${getDisplayName(WrappedComponent)})`;
  return WithNavigation;
}

export default withNavigation;

