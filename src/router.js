/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Search, Browse, Cataloging } from './components';
import { ToolbarMenu } from './lib';
import RecordDetails from './components/Search/Result/RecordDetails';
import type { Props } from './core';

type P = Props & {
    toggleFilterPane: () => void;
}

export function ComposedRoute({ id, component: Component, ...props }:P) {
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
      <ComposedRoute path={`${path}/search`} exact {...props} component={Search} firstMenu={searchMenu} data-search-component-root />
      <ComposedRoute path={`${path}/search/:id`} {...props} component={RecordDetails} firstMenu={searchMenu} data-search-component-record-detail />
      <ComposedRoute path={`${path}/browse`} exact {...props} component={Browse} firstMenu={searchMenu} data-browsing-component-root />
      <ComposedRoute path={`${path}/cataloging`} exact {...props} component={Cataloging} firstMenu={searchMenu} detail={{}} data-record-from-template-component-root />
      <Redirect from="*" to={`${path}/search`} />
    </Switch>
  );
}
