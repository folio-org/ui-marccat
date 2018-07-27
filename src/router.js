/**
 * @format
 * @flow
 */
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { TemplateView, CreateTemplate } from './Template/';
import { SimpleSearch, SearchResults } from './Search/';
import { IndexList, Diacritic } from './Indexes/';

export function ConnectedRoute({ path, id, component: Component, ...props }) { // eslint-disable-line react/prop-types
  return (
    <Route path={path}>
      <Component {...props} id={id} />
    </Route>
  );
}

const Empty = () => {
  return (
    <Paneset static>
      <Pane
        defaultWidth="fill"
        paneTitle="Marccat"
        paneSub=""
        onClose={() => {}}
      />
    </Paneset>);
};

export default class Router extends React.Component<*> {
  render() {
    const rootPath = this.props.match.path;
    return (
      <Switch>
        <ConnectedRoute path={`${rootPath}/simpleSearch`} {...this.props} component={SimpleSearch} id="simple_search" />
        <ConnectedRoute path={`${rootPath}/externalSearch`} {...this.props} component={() => {}} id="external_search" />
        <ConnectedRoute path={`${rootPath}/searchResults`} {...this.props} component={SearchResults} id="search_result" />
        <ConnectedRoute path={`${rootPath}/templateAdd`} {...this.props} component={CreateTemplate} id="template_create" />
        <ConnectedRoute path={`${rootPath}/templatelist`} {...this.props} component={TemplateView} id="template_list" />
        <ConnectedRoute path={`${rootPath}/indexList`} {...this.props} component={IndexList} id="index_list" />
        <ConnectedRoute path={`${rootPath}/diacritic`} {...this.props} component={Diacritic} id="diacritic" />
        <Route path={`${rootPath}`} {...this.props} render={() => <Empty />} id="navigation_root" />
      </Switch>
    );
  }
}
