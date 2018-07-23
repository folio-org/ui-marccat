/**
 * @format
 * @flow
 */
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import NavigatorEmpty from './Navigator/components/NavigatorEmpty';
import { TemplateView, CreateTemplate } from './Template/';
import { SimpleSearch, SearchResults } from './Search/';
import { IndexList, Diacritic } from './Indexes/';


export function ConnectedRoute({ path, id, component: Component, ...props }) {
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
        <ConnectedRoute path={`${rootPath}/externalSearch`} {...this.props} component={NavigatorEmpty} id="external_search" />
        <ConnectedRoute path={`${rootPath}/searchResults`} {...this.props} component={SearchResults} id="search_result" />
        <ConnectedRoute path={`${rootPath}/templateAdd`} {...this.props} component={CreateTemplate} id="template_create" />
        <ConnectedRoute path={`${rootPath}/templatelist`} {...this.props} component={TemplateView} id="template_list" />
        <ConnectedRoute path={`${rootPath}/indexList`} {...this.props} component={IndexList} id="index_list" />
        <ConnectedRoute path={`${rootPath}/diacritic`} {...this.props} component={Diacritic} id="diacritic" />
        <ConnectedRoute path={`${rootPath}`} {...this.props} component={NavigatorEmpty} id="navigation_root" />
      </Switch>
    );
  }
}
