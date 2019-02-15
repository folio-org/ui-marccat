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
      <ConnectedRoute path={`${path}/search`} exact {...props} component={Search} firstMenu={searchMenu} data-search-component-root />
      <ConnectedRoute path={`${path}/browse`} exact {...props} component={Browse} firstMenu={searchMenu} data-browsing-component-root />
      <ConnectedRoute path={`${path}/record/template`} exact {...props} component={CreateMarcRecord} firstMenu={searchMenu} data-record-from-template-component-root />
      <ConnectedRoute path={`${path}/record/view`} exact {...props} component={EditMarcRecord} firstMenu={searchMenu} data-view-record-component-root />
      <Redirect from="*" to={`${path}/search`} />
    </Switch>
  );
}
