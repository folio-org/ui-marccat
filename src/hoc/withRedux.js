// @flow
import * as React from 'react';
import { connect } from 'react-redux';


type DefaultProps = {};
type Props = {...DefaultProps};


export default function withRedux<Config:Props>(mapStateToProps: () => void, mapDispatchToProps: () => void,
  Component: React.AbstractComponent<Config>): React.AbstractComponent<$Diff<Config, Props>> {
  return function WrapperComponent(
    props: $Diff<Config, Props>,
  ) {
    return connect(mapStateToProps, mapDispatchToProps)(<Component {...props} mapStateToProps={mapStateToProps} />);
  };
}
