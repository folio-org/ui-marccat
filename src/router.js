/**
 * @format
 * @flow
 */
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { TemplateView, CreateTemplate } from './Template/';
import { SimpleSearch, SearchResults } from './Search/';
import { IndexList, MultiColumnListDiacritic } from './Indexes/';
import MARCcat from './App/MARCcat';
import { ReportView } from './Report';

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
        <ConnectedRoute path={`${rootPath}/simpleSearch`} {...this.props} component={SimpleSearch} id="simple_search_root" />
        <ConnectedRoute path={`${rootPath}/externalSearch`} {...this.props} component={MARCcat} id="external_search_root" />
        <ConnectedRoute path={`${rootPath}/advancedSearch`} {...this.props} component={IndexList} id="external_search_root" />
        <ConnectedRoute path={`${rootPath}/searchResults`} {...this.props} component={SearchResults} id="search_result_root" />
        <ConnectedRoute path={`${rootPath}/indexList`} {...this.props} component={IndexList} id="indexes_list_root" />
        <ConnectedRoute path={`${rootPath}/diacritic`} {...this.props} component={MultiColumnListDiacritic} id="diacritic_table_root" />
        <ConnectedRoute path={`${rootPath}/report`} {...this.props} component={ReportView} id="report_root" />
        <ConnectedRoute path={`${rootPath}/templateAdd`} {...this.props} component={CreateTemplate} id="template_create_root" />
        <ConnectedRoute path={`${rootPath}/templatelist`} {...this.props} component={TemplateView} id="template_list_root" />
        <ConnectedRoute path={`${rootPath}`} {...this.props} component={MARCcat} id="navigation_root" />
      </Switch>
    );
  }
}
