/**
 * @format
 * @flow
 */
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router/Switch';
import NavigatorEmpty from './Navigator/components/NavigatorEmpty';
import SearchResults from './Search/components/results/SearchResults';
import { TemplateView, CreateTemplate } from './Template/';
import { AdvancedSearch, SimpleSearch } from './Search/';
import IndexList from './Index/IndexList';
import DiacriticsList from './Diacritics/DiacriticsList';


export function ConnectedRoute({ path, id, component: Component, ...props }) {
  return (
    <Route path={path}>
      <Component {...props} id={id} />
    </Route>
  );
}

export default class Router extends React.Component {
  render() {
    const rootPath = this.props.match.path;
    return (
      <Switch>
        <ConnectedRoute
          path={`${rootPath}/simpleSearch`}
          component={SimpleSearch}
          id="simple_search"
        />
        <Route path={`${rootPath}/template/create`}>
          <CreateTemplate {...this.props} />
        </Route>
        <Route path={`${rootPath}/advancedSearch`}>
          <AdvancedSearch {...this.props} id="advanced_search" />
        </Route>
        <Route path={`${rootPath}/searchResults`}>
          <SearchResults {...this.props} id="search_result" />
        </Route>
        <Route path={`${rootPath}/externalSearch`}>
          <NavigatorEmpty {...this.props} id="template_view" />
        </Route>
        <Route path={`${rootPath}/templatelist`}>
          <TemplateView {...this.props} id="empty_crontainer" />
        </Route>
        <Route path={`${rootPath}/indexList`}>
          <IndexList {...this.props} id="index_list" />
        </Route>
        <Route path={`${rootPath}/diacritic`}>
          <DiacriticsList {...this.props} id="diacritic" />
        </Route>
        <Route path={`${rootPath}`}>
          <NavigatorEmpty {...this.props} id="empty_corntainer" />
        </Route>
      </Switch>
    );
  }
}
