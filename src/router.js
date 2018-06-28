/**
 * @flow
 * author: Christian Chiama
 * comapany: @Cult
 * project: Folio Project
 */
import React from 'react';
import Route from 'react-router-dom/Route';

type RouterProps = {||};
type RouterState = {||};

export default class Router<P: RouterProps, S: RouterState, Z: *> {
  static registerScreen(path:string, props, comp:React.StatelessFunctionalComponent<any>, id:string) :React.Component<any> {
    return (
      <Route path={path}>
        <component {...props} id={id} />
      </Route>);
  }


  /**
  *
  * @param {*} path
  * @param {*} props
  * @param {*} Component
  * @param {*} id
  */
  static registerView(path?:string, props, Component:React.StatelessFunctionalComponent<any>, id:string) :React.Component<any> {
    return (
      <div />
    );
  }
}
