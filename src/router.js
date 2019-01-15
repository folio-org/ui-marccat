/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Search, Browse, MarcRecord } from './components';
import { ToolbarMenu } from './lib';
import type { Props } from './core';
import ViewMarcRecord from './components/Cataloguing/ViewMarcRecord';

type P = Props & {
    toggleFilterPane: () => void;
}

export function ConnectedRoute({ id, component: Component, ...props }:P) {
  return (
    <Route render={() => <Component {...props} id={id} />} />
  );
}

export function Router({ ...props }:P) {
  const { toggleFilterPane, match: { path } } = props;
  const renderSearchIconMenu = () => {
    return (<ToolbarMenu icon={['search']} {...props} onClick={toggleFilterPane} />);
  };

  const searchMenu = renderSearchIconMenu();
  return (
    <Switch>
      <ConnectedRoute path={`${path}/search`} {...props} component={Search} firstMenu={searchMenu} id="search_component_root" />
      <ConnectedRoute path={`${path}/browse`} {...props} component={Browse} firstMenu={searchMenu} id="browsing_component_root" />
      <ConnectedRoute path={`${path}/record`} {...props} component={MarcRecord} firstMenu={searchMenu} id="record_from_template_component_root" />
      <ConnectedRoute path={`${path}/records/view`} {...props} component={ViewMarcRecord} firstMenu={searchMenu} id="view_record_component_root" />
      <Route render={() => (<Redirect to={`${path}/search`} id="nav_root_redirect" />)} />
    </Switch>
  );
}
