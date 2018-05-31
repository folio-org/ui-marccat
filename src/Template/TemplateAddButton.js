import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import TemplateNewContainer from './TemplateNewContainer';

class TemplateAddButton extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div>
        <Link to="/cataloging/template/new">
          <Button>
            <FormattedMessage id="ui-cataloging.button.new" />
          </Button>
        </Link>
        <Switch>
          <Route path="/cataloging/template/new">
            <TemplateNewContainer {...this.props} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default TemplateAddButton;
