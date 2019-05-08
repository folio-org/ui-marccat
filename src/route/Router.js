// @flow
import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Search, Browse, Cataloging } from '../components';
import { ToolbarMenu } from '../shared';
import type { Props } from '../flow/types.js.flow';

type P = {
    toggleFilterPane: () => void;
} & Props

function ComposedRoute({ component: Component, children, ...props }) {
  return (Component) ? (<Route {...props} render={() => (<Component {...props}>{children}</Component>)} />) : (<Route {...props}>{children}</Route>);
}

export default function Router({ ...props }: P) {
  const { toggleFilterPane, match: { path } } = props;
  const renderSearchIconMenu = () => {
    return (<ToolbarMenu icon={['search']} {...props} onClick={toggleFilterPane} />);
  };

  const searchMenu = renderSearchIconMenu();

  return (
    <Switch>
      <ComposedRoute path={`${path}/search`} exact {...props} component={Search} firstMenu={searchMenu} data-search-component-root />
      <ComposedRoute path={`${path}/browse`} exact {...props} component={Browse} firstMenu={searchMenu} data-browsing-component-root />
      <ComposedRoute path={`${path}/cataloging`} exact {...props} component={Cataloging} firstMenu={searchMenu} detail={{}} data-record-from-template-component-root />
      <Redirect from="*" to={`${path}/search`} />
    </Switch>
  );
}
