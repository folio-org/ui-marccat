import React from 'react';
import PropTypes from 'prop-types';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Link from 'react-router-dom/Link';
import NewTagContainer from './NewTagContainer';

class AddTagButton extends React.Component {
  render() {
    this.connectedcategories = this.props.stripes.connect(NewTagContainer);
    return (
      <div>
        <Link to="/cataloging/template/tag/new">
          <Button>
            <FormattedMessage id="ui-cataloging.button.new.tag" />
          </Button>
        </Link>
        <Switch>
          <Route path="/cataloging/template/tag/new">
            <NewTagContainer {...this.props} />
          </Route>
        </Switch>
      </div>
    );
  }
}

AddTagButton.propTypes = {
  stripes: PropTypes.shape({
    connect: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  }).isRequired,
};

export default AddTagButton;
