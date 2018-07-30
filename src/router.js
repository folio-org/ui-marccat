/**
 * @format
 * @flow
 */
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { TemplateView, CreateTemplate } from './Template/';
import { SimpleSearch, SearchResults } from './Search/';
import { IndexList } from './Indexes/';
import MultiColumnListDiacritic from './Indexes/components/MultiColumnListDiacritic';
import MARCcat from './App/MARCCat';

export function ConnectedRoute({ path, id, component: Component, ...props }) { // eslint-disable-line react/prop-types
  return (
    <Route path={path}>
      <Component {...props} id={id} />
    </Route>
  );
}

export default class Router extends React.Component<*> {
  render() {
    const rootPath = this.props.match.path;
    return (
      <Switch>
        <ConnectedRoute path={`${rootPath}/simpleSearch`} {...this.props} component={SimpleSearch} id="simple_search" />
        <ConnectedRoute path={`${rootPath}/externalSearch`} {...this.props} component={MARCcat} id="external_search" />
        <ConnectedRoute path={`${rootPath}/searchResults`} {...this.props} component={SearchResults} id="search_result" />
        <ConnectedRoute path={`${rootPath}/templateAdd`} {...this.props} component={CreateTemplate} id="template_create" />
        <ConnectedRoute path={`${rootPath}/templatelist`} {...this.props} component={TemplateView} id="template_list" />
        <ConnectedRoute path={`${rootPath}/indexList`} {...this.props} component={IndexList} id="index_list" />
        <ConnectedRoute path={`${rootPath}/diacritic`} {...this.props} component={MultiColumnListDiacritic} id="diacritic_table" />
        <ConnectedRoute path={`${rootPath}`} {...this.props} component={MARCcat} id="app_root" />
      </Switch>
    );
  }
}
