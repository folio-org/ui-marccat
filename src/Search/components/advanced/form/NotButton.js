import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@folio/stripes-components/lib/Button';
import { FormattedMessage } from 'react-intl';
import * as C from '../../../../Utils';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class NotButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  };
  render() {
    return (
      <Button
        {...this.props}
        onClick={this.props.onClick}
        type="button"
        disabled={this.props.disabled}
        buttonStyle="primary"
        style={{ minHeight: '36px' }}
      >
        <FormattedMessage id="ui-marccat.search.notButton" />
      </Button>
    );
  }
}

export default withStyles(styles)(NotButton,C.META.MODULE_NAME);