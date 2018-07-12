import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

export default function withNavigation(Component) {
  class ComponentWithNavigation extends React.Component {
    render() {
      const navigationProp = this.props.navigation;
      const navigation = navigationProp || {};
      return (
        <Component
          {...this.props}
          navigation={navigation}
          ref={this.props.onRef}
        />
      );
    }
  }

  return hoistStatics(ComponentWithNavigation, Component);
}
