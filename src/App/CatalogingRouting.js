import PropTypes from 'prop-types';
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { translate } from '../Utils/Translate';

class CatalogingRouting extends React.Component {
  static childContextTypes = {
    history: PropTypes.object,
    translate: PropTypes.func,
  };

  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };


  getChildContext() {
    return {
      history: this.props.history,
      translate: (message, values) =>
        translate(
          message,
          values,
          { namespace: 'ui-cataloging' },
          this.props.stripes
        ),
    };
  }

  NoMatch() {
    return (
      <div>
        <h2>Uh-oh!</h2>
        <p>
          How did you get to <tt>{this.props.location.pathname}</tt>?
        </p>
      </div>
    );
  }

  render() {
    const { match: { path } } = this.props;
    return (
      <Switch>
        <Route
          path={`${path}`}
          render={() => <this.connectedApp {...this.props} />}
        />
        <Route
          component={() => {
            this.NoMatch();
          }}
        />
      </Switch>
    );
  }
}

export default CatalogingRouting;
