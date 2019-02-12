/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Search, Browse, CreateMarcRecord, EditMarcRecord } from './components';
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
  const { toggleFilterPane, match: { path } } = props;
  const renderSearchIconMenu = () => {
    return (<ToolbarMenu icon={['search']} {...props} onClick={toggleFilterPane} />);
  };

  const searchMenu = renderSearchIconMenu();
  return (
    <Switch>
      <ConnectedRoute path={`${path}/search`} {...props} component={Search} firstMenu={searchMenu} data-search-component-root />
      <ConnectedRoute path={`${path}/browse`} {...props} component={Browse} firstMenu={searchMenu} data-browsing-component-root />
      <ConnectedRoute path={`${path}/record/template`} {...props} component={CreateMarcRecord} firstMenu={searchMenu} data-record-from-template-component-root />
      <ConnectedRoute path={`${path}/records/view`} {...props} component={EditMarcRecord} firstMenu={searchMenu} data-view-record-component-root />
      <Route render={() => (<Redirect to={`${path}/search`} data-redirect-from-404 />)} />
    </Switch>
  );
}
