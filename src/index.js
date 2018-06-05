import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, Redirect } from './router';
import Settings from './Settings';
import Cataloging from './App/Cataloging';
import NavigatorEmpty from './Navigator';
import { TemplateView, TemplateNewMandatory, TemplateNewContainer } from './Template/';

class CatalogingRouting extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
  };

  static childContextTypes = {
    intl: PropTypes.object,
    locale: PropTypes.string
  }

  getChildContext() {
    return {
      intl: this.props.stripes.intl,
      locale: this.props.stripes.locale
    };
  }


  render() {
    let { showSettings, match: { path: rootPath } } = this.props;
    return showSettings ? (
      <Settings {...this.props} />
    ) : (
      <Route path={rootPath} component={Cataloging}>
        <Switch>
          <Route path={`${rootPath}/cataloging/templateList`} exact component={TemplateView} />
          <Route path={`${rootPath}/cataloging/templateList/:id`} exact component={NavigatorEmpty} />
          <Route path={`${rootPath}/cataloging/templateList/:id/edit`} exact component={NavigatorEmpty} />
          <Route path={`${rootPath}/cataloging/templateList/:id/delete`} exact component={NavigatorEmpty} />
          <Route path={`${rootPath}/cataloging/templateList/create`} exact component={TemplateNewMandatory} />
          <Route path={`${rootPath}/cataloging/cataloging/simpleSearch`} exact component={NavigatorEmpty} />
          <Route path={`${rootPath}/cataloging/cataloging/advancedSearch`} exact component={NavigatorEmpty} />
          <Route path={`${rootPath}/cataloging/cataloging/externalSearch`} exact component={NavigatorEmpty} />
          <Route render={() => (<Redirect to={`${rootPath}`} />)} />
        </Switch>
        </Route>
      );
  }
}

export default CatalogingRouting;
