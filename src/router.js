/**
 * @format
 */
import * as React from 'react';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import Switch from 'react-router-dom/Switch';
import { Search, Browse } from './components';
import { ToolbarMenu } from './lib';
import type { Props } from './core';

type P = Props & {
    toggleFilterPane: () => void;
}

export function ConnectedRoute({ id, component: Component, ...props }:P) {
  return (
    <Route render={() => <Component {...props} id={id} />} />
  );
}

export function Router({ ...props }:P) {
  const renderSearchIconMenu = () => {
    return (<ToolbarMenu icon={['search']} {...props} onClick={props.toggleFilterPane} />);
  };

  const rootPath = props.match.path;
  const searchMenu = renderSearchIconMenu();
  return (
    <Switch>
      <ConnectedRoute path={`${rootPath}/search`} {...props} component={Search} firstMenu={searchMenu} id="search_component_root" />
      <ConnectedRoute path={`${rootPath}/browse`} {...props} component={Browse} firstMenu={searchMenu} id="browsing_component_root" />
      <Route render={() => (<Redirect to={`${rootPath}/search`} id="nav_root_redirect" />)} />
    </Switch>
  );
}
