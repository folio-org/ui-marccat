import React from 'react';
import PropTypes from 'prop-types';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';

class BackTo extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      block: PropTypes.func,
      push: PropTypes.func,
      pop: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRoute() {
    this.props.history.pop();
  }

  render() {
    return (
      <Button buttonStyle="primary" role="button" onClick={this.handleRoute}>
        <FormattedMessage id="ui-cataloging.button.backto" />
      </Button>
    );
  }
}

BackTo.propTypes = {};

export default BackTo;
