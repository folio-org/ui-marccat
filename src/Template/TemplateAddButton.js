import React from 'react';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import { TemplateNewContainer } from './';

class TemplateAddButton extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
  };

  render() {
    const div = { height: '100%' };
    const style = {
      backgroundColor: '#2b75bb',
      border: '1px solid #2b75bb',
      fontWeight: 600,
      color: '#fff',
      marginRight: '15px'
    };
    return (
      <div style={div}>
        <Link to="/cataloging/template/new">
          <Button style={style}>
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
