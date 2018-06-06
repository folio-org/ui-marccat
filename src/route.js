import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import { connect } from '@folio/stripes-connect';

import Route from 'react-router-dom/Route';
import { TemplateView, TemplateNewMandatory, TemplateNewContainer } from './Template/';

class TestRouter extends React.Component {
    static propTypes = {
      stripes: PropTypes.shape({
        intl: PropTypes.object.isRequired,
      }).isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <Switch>
          <Route path="/cataloging/templateList">
            <TemplateView {...this.props} id="template_view_link" />
          </Route>
        </Switch>
      );
    }
}


export default connect(TestRouter, 'ui-cataloging');
