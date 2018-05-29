import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Application from './routes/application';
import Settings from './settings';

class Cataloging extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    showSettings: PropTypes.bool,
  }

  NotFound() {
    return (
      <div>
        <h2>{this.props.stripes.intl.formatMessage({ id: 'ui-cataloging.errors.notFound.title' })}</h2>
        <p>{this.props.stripes.intl.formatMessage({ id: 'ui-cataloging.errors.notFound.suggest' }, { location: <tt>{this.props.location.pathname}</tt> })}</p>
      </div>
    );
  }


  render() {
    if (this.props.showSettings) {
      return <Settings {...this.props} />;
    }
    return (
      <Switch>
        <Route path={`${this.props.match.path}`} exact component={Application} />
        <Route component={() => { this.NotFound(); }} />
      </Switch>
    );
  }
}

export default Cataloging;
