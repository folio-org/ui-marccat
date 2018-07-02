import React from 'react';

type ProxyProps = {||};
type ProxyState = {||};

const withProxy = ProxyWrapperComponent =>
  class WithProxyComponent extends React.Component<ProxyProps, ProxyState> {
    static manifest = Object.freeze(
      Object.assign({}, ProxyWrapperComponent.manifest, {}),
    );

    render() {
      return (<ProxyWrapperComponent />);
    }
  };


export default withProxy;
