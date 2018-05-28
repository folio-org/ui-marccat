import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Application from './routes/application';

/*
  STRIPES-NEW-APP
  This is the main entry point into your new app.
*/

class Cataloging extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  render() {
    return (
      <Switch>
        <Route path={`${this.props.match.path}`} exact component={Application} />
      </Switch>
    );
  }
}

export default Cataloging;
