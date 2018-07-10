/**
 * @format
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

class NearButton extends React.Component {
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
        variant="contained" 
        color="primary" 
      >
        <FormattedMessage id="ui-cataloging.search.nearButton" />
      </Button>
    );
  }
}

export default withStyles(styles)(NearButton,C.META.MODULE_NAME);

