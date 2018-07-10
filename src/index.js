/**
 * @format
 * @flow
 */
import React from 'react';
import { Route } from 'react-router-dom';
import Switch from 'react-router-dom/Switch';
import { Settings } from './Settings';
import Cataloging from './App/Cataloging';

import './Theme/variables.css';

type RoutingProps = {|
  stripes: {
    connect: Function,
    intl: Object,
  },
  history: {
    goBack: Function,
    pop: Function,
    push: Function,
  },
  match: {
    path: string,
    id: string,
  },
  location: {
    pathname: string,
  },
  showSettings: boolean,
|};

class CatalogingRouting extends React.Component<RoutingProps, {}> {
  constructor(props) {
    super(props);
    this.connectedApp = props.stripes.connect(Cataloging);
  }

  render() {
    let { showSettings } = this.props;
    if (showSettings) {
      return <Settings {...this.props} />;
    }
    return (
      <Switch>
        <Route
          {...this.props}
          path={`${this.props.match.path}`}
          render={() => <this.connectedApp {...this.props} />}
        />
      </Switch>
    );
  }
}

export default CatalogingRouting;
