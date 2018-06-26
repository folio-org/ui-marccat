// @flow
import React from 'react';
import Route from 'react-router-dom/Route';


type RouterEvent = {|
  registerScreen: (path:string, component:React.Component<any>)=> void;
|};

type RouterProps = {||};
type RouterState = {||};

export default class Router extends React.Component<RouterProps, RouterState> {
  render() {
    const comp = <div />;
    return (
      this.registerScreen('', {}, comp, 'rr')
    );
  }
  registerScreen(path:string, props, component:React.Component<any>, id:string) :React.Component<any> {
    return (
      <Route path={path}>
        <component {...props} id={id} />
      </Route>);
  }
}
