/**
 * @flow
 * author: Christian Chiama
 * comapany: @Cult
 * project: Folio Project
 */
import React from 'react';
import Route from 'react-router-dom/Route';


export default class Router<P = {}, S = {}> {
  static registerScreen(path:string, props:P, state: S, comp:React.StatelessFunctionalComponent<any>) :React.Component<any> { // eslint-disable-line no-unused-vars
    return (
      <Route path={path}>
        <component {...props} />
      </Route>);
  }


  /**
  *
  * @param {*} path
  * @param {*} props
  * @param {*} Component
  * @param {*} id
  */
  static registerView(path?:string, props, Component:React.StatelessFunctionalComponent<any>) :React.Component<any> { // eslint-disable-line no-unused-vars
    return (
      <div />
    );
  }
}
