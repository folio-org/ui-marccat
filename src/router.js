import React from 'react';
import PropTypes from 'prop-types';
import { WrapRouter, Route, Switch, Redirect } from './wraprouter';
import Settings from './Settings';
import Cataloging from './App';
import NavigatorEmpty from './Navigator/NavigatorEmpty';
import { TemplateView, TemplateNewMandatory } from './Template/';

class Router extends React.Component {
  constructor(props, context) {
    super(props);
    this.context = context;
    const stripes = context.stripes;
  }

  render() {
    const rootPath = 'http://localhost:3000/cataloging';
      <WrapRouter path={`${rootPath}`} component={Cataloging}>
        <Switch>
          <Route path={`${rootPath}/templateList`} exact component={TemplateView} />
          <Route path={`${rootPath}/templateList/:id`} exact component={NavigatorEmpty} />
          <Route path={`${rootPath}/templateList/:id/edit`} exact component={NavigatorEmpty} />
          <Route path={`${rootPath}/templateList/:id/delete`} exact component={NavigatorEmpty} />
          <Route path={`${rootPath}/templateList/create`} exact component={TemplateNewMandatory} />
          <Route path={`${rootPath}/simpleSearch`} exact component={NavigatorEmpty} />
          <Route path={`${rootPath}/advancedSearch`} exact component={NavigatorEmpty} />
          <Route path={`${rootPath}/externalSearch`} exact component={NavigatorEmpty} />
          <Route render={() => (<Redirect to={`${rootPath}`} />)} />
        </Switch>
      </WrapRouter>;
  }
}

export default Router;
