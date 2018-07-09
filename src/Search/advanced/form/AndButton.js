import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from '@folio/stripes-connect';
import { PropTypes } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as C from '../../../Utils';

class AndButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  };
  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        {...this.props}
        onClick={this.props.onClick}
        type="button"
        disabled={this.props.disabled}
      >
        <FormattedMessage id="ui-cataloging.search.andButton" />
      </Button>
    );
  }
}

export default connect(AndButton, C.META.MODULE_NAME);
